import React, { Fragment } from "react";
import { Pagination as MuiPagination, PaginationItem } from "@mui/material";
import type { QuestionDataType } from "../../../stores/page-store";
import { Div } from "./styled";

interface PaginationProps {
  page: number;
  itemList: QuestionDataType[]; 
  itemsPerPage: number; 
  handlePaginationChange :  (e: React.ChangeEvent<unknown>, value: number) => void;
}

export const Pagination = ({
  page, itemList, itemsPerPage, handlePaginationChange
} : PaginationProps) => {
  return(
    <Div>
      <Fragment>
        <MuiPagination
          variant="outlined"
          shape="rounded"
          page={page}
          count={Math.ceil(itemList.length/itemsPerPage)}
          onChange={handlePaginationChange}
          style={{ float:'right', margin:'0 13px 16px 0'}}
          renderItem={(item) => (
            <PaginationItem {...item} sx={{ color: '#8B5CF6', border: '1px solid white'}} />
          )}
        />
      </Fragment>
    </Div>

  );
};
