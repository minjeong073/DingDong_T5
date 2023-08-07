import { Number } from 'mongoose';
import dummy from '../../db/articles.json';
import { Tr, HashTag, Div } from './styled';

export const HashTagBar = () => {
  // 많이 언급된 hashtag 순서대로 정렬한 api 호출

  const HashtagArr = dummy.articles.map(item => item.hashtag);
  const oneHashtag = HashtagArr.flat();
  const onlyHashtag = Array.from(new Set(oneHashtag)).slice(0, 9);

  return (
    <>
      <Div>
        {onlyHashtag.map((item, index) =>
          <Tr key={index}>
            <HashTag key={item}>{item}</HashTag>
          </Tr>
        )}
     </Div>
    </>
  );
};
