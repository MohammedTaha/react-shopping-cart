import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ArchiveIcon from "material-ui/svg-icons/content/archive"
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';


export default function () {
    return (
        <div className="allOrdersWrapper">
            <Table className="allOrdersTable">
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>S.No.</TableHeaderColumn>
                        <TableHeaderColumn>Checked Out On</TableHeaderColumn>
                        <TableHeaderColumn>Number of items</TableHeaderColumn>
                        <TableHeaderColumn>Total Charges</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>Action</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>

                    {
                        this.props.allModifiedOrders && this.props.allModifiedOrders.length
                            ?
                            this.props.allModifiedOrders.map((o, index) => {
                                return (
                                    <TableRow key={`order-${index}`}>
                                        <TableRowColumn>{index + 1}</TableRowColumn>
                                        <TableRowColumn>{o.checkedoutOn}</TableRowColumn>
                                        <TableRowColumn>{o.numberOfItems}</TableRowColumn>
                                        <TableRowColumn>{o.totalCharges}</TableRowColumn>
                                        <TableRowColumn>{o.status}</TableRowColumn>
                                        <TableRowColumn>
                                            {
                                                o.status === 'Initiated'
                                                    ?
                                                    <RaisedButton onClick={this.navigateToShoppingCart.bind(this)} icon={<ShoppingCartIcon />}> Cart </RaisedButton>
                                                    :
                                                    <RaisedButton onClick={this.props.markAsArchived.bind(this, o._id, index)} icon={<ArchiveIcon />}> Archive </RaisedButton>
                                            }
                                        </TableRowColumn>


                                    </TableRow>
                                )
                            })
                            :
                            <TableRow>
                                <TableRowColumn> No Order exists yet.</TableRowColumn>
                            </TableRow>
                    }
                </TableBody>
            </Table>
        </div>
    )
}