import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TablePagination from '@material-ui/core/TablePagination'
import shortid from 'shortid'
import produce from 'immer'
import _object from "lodash/object";
import { currencyFormat, formatNumber } from "../lib/util";

const formatters = {
  "currency": currencyFormat,
  "number": formatNumber,
}

const useStyles = makeStyles((theme) => ({
  head: {
    fontWeight: 'bold',
    opacity: 0.8,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  pagination: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}))

const getTableHeaders = (props, options) => {
  const classes = useStyles()
  const headers = React.Children.map(props.children, (child) => {
    const { caption, expr, ...rest } = child.props
    return (
      <TableCell key={shortid.generate()} className={classes.head} {...rest}>
        {caption}
      </TableCell>
    )
  })

  if (options.singleSelect) {
    headers.unshift(
      <TableCell key={shortid.generate()} padding='checkbox'>
        <span>{" "}</span>
      </TableCell>
    )
  } else if (options.multiSelect) {
    const { numSelected, rowCount, onSelectAllClick } = options
    headers.unshift(
      <TableCell key={shortid.generate()} padding='checkbox'>
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
    )
  }

  return headers
}

const cloneChildren = (item, children) => {
  return React.Children.map(children, (child) => {
    const { action, children } = child.props
    if (typeof action === 'function') {
      const delegateFunc = (evt) => {
        evt.stopPropagation()
        action(item)
      }
      return React.cloneElement(child, { action: delegateFunc }, children)
    } else if (children.length > 0) {
      const subChildren = cloneChildren(item, children);
      return React.cloneElement(child, {}, subChildren);
    }
    return child
  })
}

const getCellValue = ({item, expr, format, children}) => {
  let cellValue;
  if (expr) {
    if (typeof expr === 'string') {
      const formatter = formatters[format];
      const value = _object.get(item, expr);
      cellValue = formatter ? formatter(value) : value;
    } else {
      cellValue = expr(item).toString()
    }
  } else {
    if (typeof(children) === "function") {
      cellValue = children(item);
    } else {
      cellValue = cloneChildren(item, children)
    }
  }
  return cellValue;
}

const getTableBody = (props, selectedItems, options) => {
  const { items = [], children } = props
  const body = []
  items.forEach((item) => {
    const cells = React.Children.map(children, (child, idx) => {
      const { caption, expr, format, children, ...rest } = child.props
      const cellValue = getCellValue({item, expr, format, children});
      const firstCellProps = idx === 0 ? { component: 'th', scope: 'row' } : {}
      return (
        <TableCell key={shortid.generate()} {...firstCellProps} {...rest}>
          {cellValue}
        </TableCell>
      )
    })
    if (options.multiSelect || options.singleSelect) {
      const { keyId } = props;
      const isItemSelected = selectedItems.findIndex(o => o[keyId] === item[keyId]) >= 0
      cells.unshift(
        <TableCell key={shortid.generate()} padding='checkbox'>
          <Checkbox checked={isItemSelected} />
        </TableCell>
      )
      body.push(
        <TableRow
          hover
          onClick={(event) => options.onSelectItem(event, item)}
          role='checkbox'
          tabIndex={-1}
          key={shortid.generate()}
          selected={isItemSelected}
        >
          {cells}
        </TableRow>
      )
    } else {
      body.push(<TableRow key={shortid.generate()}>{cells}</TableRow>)
    }
  })
  return body
}

const CustomTable = (props) => {
  const {
    items = [],
    showPagination = true,
    rowsPerPage: initialRowsPerPage = 5,
    fetchList,
    singleSelect = false,
    multiSelect = false,
    keyId,
    onSelectItems,
    ...rest
  } = props

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)
  const [selectedItems, setSelectedItems] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    setSelectedItems([])
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  useEffect(() => {
    if (fetchList) {
      fetchList({ start: page, limit: rowsPerPage });
    }
  }, [page, rowsPerPage])

  const getLabelDisplayRows = (params) => {
    const { from, to, count } = params
    return `${from}-${to} of ${count !== -1 ? to : '?'}`
  }

  const onSelectAllClick = () => {
    if (selectedItems.length === 0) {
      setSelectedItems(items)
    } else {
      setSelectedItems([])
    }
  }

  const onSelectItem = (event, item) => {
    const idx = selectedItems.findIndex(o => o[keyId] === item[keyId]);
    if (idx >= 0) {
      setSelectedItems(
        produce((prevItems) => prevItems.filter(o => o[keyId] !== item[keyId]))
      )
    } else {
      if (multiSelect) {
        setSelectedItems(selectedItems.concat(item));
      } else {
        //single select
        setSelectedItems([item]);
      }
    }
  }

  // push to handler
  useEffect(() => {
    if (onSelectItems) {
      onSelectItems(selectedItems);
    }
  }, [selectedItems])

  const classes = useStyles()
  const count =
    items.length === rowsPerPage ? -1 : page * rowsPerPage + items.length
  const recordCount = count === -1 ? rowsPerPage : items.length

  const options = multiSelect || singleSelect
    ? {
        numSelected: selectedItems.length,
        rowCount: recordCount,
        multiSelect,
        singleSelect,
        onSelectAllClick,
        onSelectItem
      }
    : {}

  const header = getTableHeaders(props, options)
  const body = getTableBody(props, selectedItems, options)

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table {...rest} size="small">
          <TableHead>
            <TableRow>{header}</TableRow>
          </TableHead>
          <TableBody>{body}</TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelDisplayedRows={getLabelDisplayRows}
        />
      )}
    </Paper>
  )
}

export default CustomTable
