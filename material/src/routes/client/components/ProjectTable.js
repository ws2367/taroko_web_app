import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

function SimpleTable({match}) {


  return (
    <div className="box box-default table-responsive mb-4">
      <Table className="table-hover">
        <TableHead>
          <TableRow>
            <TableCell>名字</TableCell>
            <TableCell>標籤</TableCell>
            <TableCell>任職公司</TableCell>
            <TableCell>認識方式</TableCell>
            <TableCell>有興趣保險類別</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell component="th" scope="row"><Link to="/app/client/1" className="link-cta link-animated-hover link-hover-v1 text-primary">方大同</Link></TableCell>
            <TableCell><Chip label="A級客戶" className="table-chip bg-info px-2" /><Chip label="美元" className="table-chip bg-info px-2" /></TableCell>
            <TableCell>中華開發</TableCell>
            <TableCell>緣故客戶</TableCell>
            <TableCell>壽險</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell component="th" scope="row">張忠謀</TableCell>
            <TableCell><Chip label="B級客戶" className="table-chip bg-info px-2" /></TableCell>
            <TableCell>美麗華</TableCell>
            <TableCell>陌生開發</TableCell>
            <TableCell>儲蓄險</TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell component="th" scope="row">陳時中</TableCell>
            <TableCell><Chip label="D級客戶" className="table-chip bg-info px-2" /></TableCell>
            <TableCell>台積電</TableCell>
            <TableCell>陌生開發</TableCell>
            <TableCell>長照險</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default SimpleTable;
