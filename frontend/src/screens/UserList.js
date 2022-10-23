import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Meta from "../components/Meta";

const UserList = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h5"
        sx={{ fontFamily: "Playfair Display", textAlign: "center", my: 2 }}
      >
        USERS
      </Typography>

      <Meta title="Users List" />

      {loading ? (
        <Loader />
      ) : error ? (
        <Alerts severity="error" message={error} />
      ) : (
        <TableContainer sx={{ my: 2 }} component={Paper}>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                {/* <TableCell color="text.secondary">ID</TableCell> */}
                <TableCell align="right" color="text.secondary">
                  NAME
                </TableCell>
                <TableCell align="right" color="text.secondary">
                  EMAIL
                </TableCell>
                {/* <TableCell align='right' color='text.secondary'>
                  ADMIN
                </TableCell> */}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell
                    title={user._id}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: {
                        xs: '25px',
                        sm: '25px',
                        md: '150px',
                        lg: '200px',
                      },
                    }}
                  >
                    {user._id}
                  </TableCell> */}
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">
                    <a
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      href={`mailto:${user.email}`}
                    >
                      {user.email}
                    </a>
                  </TableCell>
                  {/* <TableCell align='right'>
                    {user.isAdmin ? (
                      <CheckIcon color='success' />
                    ) : (
                      <ClearIcon color='error' />
                    )}
                  </TableCell> */}

                  <TableCell align="right">
                    {/* <Link
                      component={RouterLink}
                      underline="none"
                      to={`/admin/user/${user._id}/edit`}
                    >
                      <Button size="small">
                        <AppRegistrationIcon />
                      </Button>
                    </Link> */}
                    <Button
                      aria-label="delete user"
                      onClick={() => deleteHandler(user._id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UserList;
