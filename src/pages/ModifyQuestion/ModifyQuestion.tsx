import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../../components';
import {
  HashtagIcon,
  QuestionForm,
  QuestionKeywordSection,
  QuestionTitleInput,
  QuestionTitleSection,
  QuestionTypo,
} from './styled';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { QuestionData } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import { useSetRecoilState } from 'recoil';
import modules from '../../utils/quillModules';
import { TagsInput } from 'react-tag-input-component';

export const ModifyQuestion = () => {
  const QuillRef = useRef<ReactQuill | null>(null);
  const [contents, setContents] = useState('');
  const [modifiedArticle, setModifiedArticle] = useState<QuestionDataType | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const { _id } = useParams<{ _id: string }>();
  const navigate = useNavigate();

  const setQuestionData = useSetRecoilState(QuestionData); // Recoil setter

  const fetchArticleData = async () => {
    try {
      const response = await axios.get(`/api/articles/${_id}`);
      setModifiedArticle(response.data);
      setContents(response.data.content);
      setSelected(response.data.hashtags);
    } catch (error) {
      console.error(error);
      alert('게시글 정보 가져오기 실패!');
    }
  };

  const updateQuestion = async () => {
    try {
      if (!modifiedArticle) {
        return;
      }
      if (modifiedArticle.title === '' || contents === '') {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
      }
      await axios.put(`/api/articles/${_id}`, {
        ...modifiedArticle,
        content: contents,
        hashtags: selected,
      });
      setQuestionData((prevQuestionData: QuestionDataType[]) => {
        const updatedData = prevQuestionData.map(item =>
          item._id === _id ? { ...item, title: modifiedArticle.title, content: contents, hashtags: selected } : item,
        );
        return updatedData;
      });
      alert('질문 수정 성공!');
      navigate(`/articles/${_id}`);
    } catch (error) {
      console.error(error);
      alert('질문 수정 실패!');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedArticle(
      prevState =>
        ({
          ...prevState,
          title: e.target.value,
        } as QuestionDataType | null),
    );
  };

  useEffect(() => {
    fetchArticleData();
  }, [_id]);

  useEffect(() => {
    setModifiedArticle(prevState => ({ ...prevState, content: contents } as QuestionDataType | null));
  }, [contents]);

  useEffect(() => {
    if (selected.length > 3) {
      alert('키워드는 최대 3개까지 입력가능합니다');
      setSelected(selected.slice(0, 3));
    }
    setModifiedArticle(prevState => ({ ...prevState, hashtags: selected } as QuestionDataType | null));
  }, [selected]);

  return (
    <QuestionForm>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitleInput value={modifiedArticle?.title || ''} onChange={handleTitleChange} />
      </QuestionTitleSection>
      <ReactQuill
        ref={QuillRef}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
      <QuestionKeywordSection>
        <HashtagIcon />
        <TagsInput value={selected} onChange={setSelected} name="hashtags" placeHolder="키워드를 입력해주세요." />
      </QuestionKeywordSection>
      <Button type="button" onClick={updateQuestion}>
        수정 완료
      </Button>
    </QuestionForm>
  );
};
