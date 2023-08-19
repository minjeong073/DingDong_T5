import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import type { QuestionDataType } from 'stores/page-store';
import { QuestionRow } from "../../components/QuestionRow";
import { Table, Tbody } from "../../components/List/ArticlesTable/styled";
import { Div} from './styled';

export const SearchPage = () => {
  const [SearchData, setSearchData] = useState<QuestionDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');

  useEffect(() => {
    const fetchSearchData = async(keyword:string) => {
      try{
        setIsLoading(true);
        const response = await axios.get(`/api/search?keyword=${encodeURIComponent(keyword)}`);
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

  return (
    <>
      {isLoading ? (
        <Div> Loading ... </Div>
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
