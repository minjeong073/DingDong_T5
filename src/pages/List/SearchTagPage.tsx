import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import type { QuestionDataType } from 'stores/page-store';
import { QuestionRow } from "../../components/QuestionRow";
import { Table, Tbody } from "../../components/List/ArticlesTable/styled";

export const SearchTagPage = () => {
  const [SearchData, setSearchData] = useState<QuestionDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('hashtag');

  useEffect(() => {
    const fetchSearchData = async(keyword:string) => {
      try{
        setIsLoading(true);
        const response = await axios.get(`/api/search/hashtag/?hashtag=${encodeURIComponent(keyword)}`);
        setSearchData(response.data);
      }catch(error){
        console.error('Error fetching data: ', error);
      }finally{
        setIsLoading(false);
      }
    };
    if(keyword)
      fetchSearchData(keyword);
  }, []);

  console.log(keyword);

  return (
    <>
      {isLoading ? (
        <div> Loading ... </div>
          ) : (
            <Table>
              <Tbody>
                {SearchData?.map((item, idx) => (
                <QuestionRow key={idx} item={item} />
                ))}
              </Tbody>
            </Table>
      )}          
    </>
  );
};