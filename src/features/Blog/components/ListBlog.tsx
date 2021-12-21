import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "../../../components/button/ButtonPrimary";
import DialogConfirm from "../../../components/dialog/DialogConfirm";
import CrcularProgress from "../../../components/progress/CrcularProgress";
import useBlogs from "../../../hooks/blog/useBlogs";
import { useRemoveBlog } from "../../../hooks/blog/useRemoveBlog";
import PreviewContent from "./PreviewContent";

interface Data {
  id: string;
  title: string;
  description: string;
  author: any;
  image: string;
  topics: any[];
  content: string;
  tags: any[];
  slug: string;
  created_at: string;
  updated_at: string;
  is_public: any;
}

function createData(
  id: string,
  title: string,
  description: string,
  author: any,
  image: string,
  topics: any[],
  content: string,
  tags: any[],
  slug: string,
  created_at: string,
  updated_at: string,
  is_public: any
): Data {
  return {
    id,
    title,
    description,
    author,
    image,
    topics,
    content,
    tags,
    slug,
    created_at,
    updated_at,
    is_public,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly any[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "title",
    numeric: true,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "author",
    numeric: true,
    disablePadding: false,
    label: "Author",
  },
  {
    id: "topics",
    numeric: true,
    disablePadding: false,
    label: "Topics",
  },
  {
    id: "tags",
    numeric: true,
    disablePadding: false,
    label: "Tags",
  },
  {
    id: "slug",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
  {
    id: "content",
    numeric: true,
    disablePadding: false,
    label: "Preview",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDelete?: any;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Blogs
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => props.handleDelete()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Create Topic">
          <Link to={`/blogs/create`}>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default function ListBlog() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const { data, isLoading } = useBlogs({});
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const mutation = useRemoveBlog();
  const toastId = React.useRef<any>(null);
  const [previewContent, setPreviewContent] = React.useState<any>({});
  const [openPreviewContent, setOpenPreviewContent] =
    React.useState<boolean>(false);

  const rows = React.useMemo(() => {
    if (data?.results) {
      const rows = data?.results?.map((blog: any) => {
        return createData(
          blog?.id,
          blog?.title,
          blog?.description,
          blog?.author,
          blog?.image,
          blog?.topics,
          blog?.content,
          blog?.tags,
          blog?.slug,
          blog?.created_at,
          blog?.updated_at,
          blog?.is_public
        );
      });
      return rows;
    }
    return [];
  }, [data]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: any) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: any) => selected.indexOf(id) !== -1;

  // xử lý xóa topics
  const handleDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    (async () => {
      toastId.current = toast("🦄 Đang xóa blog", { autoClose: false });
      try {
        await mutation.mutateAsync(selected);
        toast.update(toastId.current, {
          render: "🦄 Xóa blog thành công",
          autoClose: 5000,
          type: toast.TYPE.SUCCESS,
        });
        setOpenConfirmDelete(false);
        setSelected([]);
      } catch (e: any) {
        toast.update(toastId.current, {
          render: "🦄 Xóa blog thất bại",
          autoClose: 5000,
          type: toast.TYPE.ERROR,
        });
      }
    })();
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CrcularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: "30px",
          p: 3,
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const topics = row?.topics;
                  const tags = row?.tags;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ height: 70 }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">
                        {row.author.username}
                      </TableCell>
                      <TableCell align="center">
                        {topics
                          ? topics?.map((topic: any) => topic.name).join(", ")
                          : ""}
                      </TableCell>
                      <TableCell align="center">
                        {tags
                          ? tags?.map((tag: any) => tag.name).join(", ")
                          : ""}
                      </TableCell>
                      {/* <TableCell align="center">{row.title}</TableCell> */}
                      <TableCell align="center">
                        <Link
                          to={`/blogs/${row.slug}`}
                          style={{ textDecoration: "none" }}
                        >
                          <ButtonPrimary>Chỉnh sửa</ButtonPrimary>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <ButtonPrimary
                          onClick={() => {
                            setPreviewContent({
                              title: row.title,
                              content: row.content,
                            });
                            setOpenPreviewContent(true);
                          }}
                        >
                          Preview
                        </ButtonPrimary>
                        <PreviewContent
                          open={openPreviewContent}
                          onClose={() => setOpenPreviewContent(false)}
                          title={previewContent.title}
                          content={previewContent.content}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DialogConfirm
        message={"Bạn có chắc chắn muốn blog này?"}
        open={openConfirmDelete}
        title={"Xóa blog"}
        handleConfirm={handleConfirmDelete}
        handleClose={() => setOpenConfirmDelete(false)}
      />
    </Box>
  );
}
