import { Articles } from '../../components/List/ArticleList/Articles';
import { useLocation } from 'react-router-dom';

export const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const keyword = queryParams.get('keyword');
  console.log(keyword);

  return (
    // <ListContainer>
    <Articles />
    // </ListContainer>
  );
};
