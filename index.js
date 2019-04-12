import React from 'react';
import ReactDOM from 'react-dom';
import {
  Plugin,
  Template,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  SelectionState,
  RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap3';

class TableToggleAllRowDetail extends React.PureComponent {
  render() {
    return (
      <Plugin>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => tableRow.type === 'heading' && tableColumn.type === 'detail'}
        >
          {params => (
            <TemplateConnector>
              {({ rows, getRowId, expandedDetailRowIds }, { toggleDetailRowExpanded }) => (
                <Table.Cell
                  {...params}
                >
                  <button
                    onClick={() => {
                      const newState = expandedDetailRowIds.length !== rows.length;
                      rows
                        .map(row => getRowId(row))
                        .forEach(rowId => toggleDetailRowExpanded({ rowId, state: newState }));
                    }}
                  >
                    *
                  </button>
                </Table.Cell>
              )}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      rows: [
        { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
        { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
        { id: 2, product: 'DevExtreme Angular', owner: 'DevExpress' },
        { id: 3, product: 'DevExtreme Knockout', owner: 'DevExpress' },
        { id: 4, product: 'DevExtreme jQuery', owner: 'DevExpress' },
        { id: 5, product: 'DevExtreme AngularJS', owner: 'DevExpress' },
        { id: 6, product: 'DevExtreme', owner: 'DevExpress' },
        { id: 7, product: 'DevExtreme Reactive', owner: 'DevExpress' },
        { id: 8, product: 'DevExtreme Angular', owner: 'DevExpress' },
        { id: 9, product: 'DevExtreme Knockout', owner: 'DevExpress' },
        { id: 10, product: 'DevExtreme jQuery', owner: 'DevExpress' },
        { id: 11, product: 'DevExtreme AngularJS', owner: 'DevExpress' },
      ],
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'owner', title: 'Owner' },
      ],
      expandedDetailRowIds: [],
    }

    this.changeExpandedDetailRowIds = (expandedDetailRowIds) => {
      this.setState({ expandedDetailRowIds });
    };
  }
  render() {
    const { rows, columns, expandedDetailRowIds } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <RowDetailState
          expandedRowIds={expandedDetailRowIds}
          onExpandedRowIdsChange={this.changeExpandedDetailRowIds}
        />
        <Table />
        <TableHeaderRow />
        <TableRowDetail />
        <TableToggleAllRowDetail />
      </Grid>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
