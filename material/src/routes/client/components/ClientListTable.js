import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tag from './Tag';

function SimpleTable({match, clients}) {
  return (
    <div className="box box-default table-responsive mb-4">
      <Table className="table-hover">
        <TableHead>
          <TableRow>
            <TableCell>名字</TableCell>
            <TableCell>標籤</TableCell>
            <TableCell>任職公司</TableCell>
            <TableCell>認識方式</TableCell>
            <TableCell>筆記摘要</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            clients.map((client, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Link to={{
                      pathname: "/app/client/" + client.profile.id,
                      state: {
                        client: client
                      }
                    }} className="link-cta link-animated-hover link-hover-v1 text-primary">{client.profile.name}
                  </Link></TableCell>
                <TableCell><Tag tags={client.profile.tags} /></TableCell>
                <TableCell>{client.profile.company}</TableCell>
                <TableCell>{client.profile.source}</TableCell>
                <TableCell>{client.note_summary}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default SimpleTable;
