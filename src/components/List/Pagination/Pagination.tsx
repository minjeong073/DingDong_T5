import React, {useState} from 'react';
import {
  PrevSpan,
  Span,
  NextSpan
} from "./styled";
import { ArticlesTable } from '../ArticlesTable';
import { useRecoilState, useRecoilValue } from "recoil";
import { ItemsState, StartState, CurrentState } from "../../../stores/page-store";
import dummy from "../../../db/articles.json";

const itemsPerPage = 5;

// const FETCH_BOARDS = gql`
//   query fetchBoards($page: Int) {
//     fetchBoards(page: $page){
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;

// const FETCH_BOARDS_COUNT = gql`
//  query{
//   fetchBoardsCount
//  } 
// `;

export const Pagination = () => {
  
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useRecoilState(CurrentState);
  const [itemsPerPage, setItemsPerPage] = useRecoilState(ItemsState);

  // const { data, refetch } = useQuery<
  //   Pick<IQUery, "fetchBoards">,
  //   IQueryFetchBoardsArgs
  // >{FETCH_BOARDS};

  // const { data: dataBoardsCount } = useQuery{FETCH_BOARDS_COUNT};
  // const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  // 더미데이터로 페이지 범위 설정하기
  const BoardsCount = dummy.articles.length;
  const lastPage = Math.ceil((BoardsCount ?? 5)/5);



  const onClickPage = (event : any)=> {
    setCurrentPage(event);
    // refetch({ page: Number(event.target.id)});
  }

  //현재페이지가 6~10
  const onClickPrevPage = ():void => {
    if(startPage === 1) return;
    setStartPage((prev) => prev - 10);
    //refetch({ page: startPage - 10});
  }

  const onClickNextPage = () => {
    if(startPage + 5 <= lastPage) return;
    setStartPage((prev) => prev + 10);
      //refetch({ page: startPage + 10 });
    
  }

  return(
  <>
    {/* <PrevSpan onClick={onClickPrevPage}>이전</PrevSpan>
    
    {new Array(5).fill(1).map((_, index) =>
      index + startPage <= lastPage && (
        <Span
          onClick={onClickPage}
          id={String(index + startPage)}
          key={index + startPage}
        >
        {` ${index + startPage} `}
        </Span>
      )
    )}
    <NextSpan onClick={onClickNextPage}>다음</NextSpan> */}

    { new Array(5).fill(1).map((_, index) => {
      const page = index +1;
      return (
        <button
          key={page}
          onClick={onClickPage}
          disabled={currentPage === page}
        >
          {page}
        </button>
      )
    })}
  </>  
  )
}