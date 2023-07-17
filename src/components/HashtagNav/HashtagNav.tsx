import dummy from "../../db/articles.json";
import {
  NavBar,
  Table,
  Tr,
  HashTag
} from "./styled"

export const HashTagNav = () => {

  const HashtagArr = dummy.articles.map((item) => item.hashtag);
  const oneHashtag = HashtagArr.flat();
  const onlyHashtag = Array.from(new Set(oneHashtag));

  return(
    <NavBar>
      <Table>
        <tbody>
            {onlyHashtag.map((item, index) => (
              index % 2 === 0 ? (
                <Tr key={index}>
                  <td>
                  <HashTag key={item}>{item}</HashTag>
                  {index + 1 < onlyHashtag.length ? <HashTag>{onlyHashtag[index + 1]}</HashTag> : null}
                  </td>
                </Tr>
              ) : null
            ))}
    </tbody>
    </Table>
  </NavBar>  
  )
}
