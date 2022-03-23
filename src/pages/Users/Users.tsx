import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { IUser } from './../../types/users';
import './Users.scss'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface IProps {
    users: IUser[]
}

const Users = (props: IProps) => {

    const [filterArr, setFilterArr] = useState<IUser[]>(props.users)

    const [filterByName, setFilterByName] = useState<string>('');

    const [filterByCity, setFilterByCity] = useState<string>('');

    const changeFilter = (value: string, filterBy: string): void => {
        if (filterBy === 'name') {
            setFilterByName(value)
            setFilterByCity('')
            if (value === '↑') setFilterArr([...filterArr].sort((x, y) => x.name.localeCompare(y.name)))
            else setFilterArr([...filterArr].sort((x, y) => y.name.localeCompare(x.name)))
        }
        else if (filterBy === 'city') {
            setFilterByCity(value)
            setFilterByName('')
            if (value === '↑') setFilterArr([...filterArr].sort((x, y) => x.address.city.localeCompare(y.address.city)))
            else setFilterArr([...filterArr].sort((x, y) => y.address.city.localeCompare(x.address.city)))
        }
    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className='user-list'>
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => changeFilter(filterByName === '↑' ? '↓' : '↑', 'name')}>
                                Name {filterByName === '' ? "" : filterByName}
                            </TableCell>
                            <TableCell onClick={() => changeFilter(filterByCity === '↑' ? '↓' : '↑', 'city')}>
                                City {filterByCity === '' ? "" : filterByCity}
                            </TableCell>
                            <TableCell>Company name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterArr.map((x) => {
                            return (
                                <TableRow key={x.id}>
                                    <TableCell>{x.name}</TableCell>
                                    <TableCell>{x.address.city}</TableCell>
                                    <TableCell>{x.company.name}</TableCell>
                                    <Link to={`/user-profile/${x.id}`}>
                                        <TableCell>More...</TableCell>
                                    </Link>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
};

export default Users;