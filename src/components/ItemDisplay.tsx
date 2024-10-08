import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function ItemDisplay({ items }: any) {
  function createData(
    id: string,
    title: string,
    description: string,
    status: string,
    results: number[],
  ) {
    return { id, title, description, status, results };
  }
  const [rows, setRows] = useState<any>([])


  useEffect(() => {
    if (items.length > 0) {
      setRows([]);
      for (const item of items) {
        let data = createData(item?.publicKey?.toBase58(), item?.account.title, item?.account?.description, item?.account?.finished ? "Completed" : "Ongoing", item?.account.voteCounts)
        setRows((prevRows: any) => [...prevRows, data])
      }
    }
  }, [items])

  return (

    <div className='text-[14px] '>
      <div className='font-bold text-[14px] flex flex-row justify-between'>
        <p>Proposals</p>
        {/* <Link to={`/view-all`}>View all</Link> */}
      </div>
      <TableContainer component={Paper} color="black" >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell sx={{ fontSize: 12 }}>Title</TableCell>
              <TableCell sx={{ fontSize: 12 }} align="left">Description</TableCell>
              <TableCell sx={{ fontSize: 12 }} align="left">Status</TableCell>
              <TableCell sx={{ fontSize: 12 }} align="left">Results</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow
                key={row.title + index.toString()}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ fontSize: 12 }} component="th" scope="row">

                  <Link href={`proposal-page?id=${row.id}`}>  {row.title} </Link>
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="left">{row.description}</TableCell>
                <TableCell sx={{ fontSize: 12 }} align="left">{row.status}</TableCell>
                <TableCell sx={{ fontSize: 12 }} align="left">{row.results.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}
