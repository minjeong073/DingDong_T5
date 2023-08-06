import { useEffect, useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../../components/Button';
import {
  HashtagIcon,
  KeywordInput,
  QuestionForm,
  QuestionKeywordSection,
  QuestionTitleInput,
  QuestionTitleSection,
  QuestionTypo,
} from './styled';
import axios from 'axios';
import e from 'express';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { QuestionData } from '../../stores/page-store';
import type { QuestionDataType } from '../../stores/page-store';
import modules from '../../utils/quillModules';
import { TagsInput } from 'react-tag-input-component';

export const WriteQuestion = () => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    votes: 0,
    answers: 0,
    views: 0,
    saves: 0,
    author: 'so',
    hashtags: [],
    isDeleted: false,
  });
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const setQuestionData = useSetRecoilState(QuestionData); // Recoil setter

  const postQuestion = async () => {
    try {
      if (newArticle.title === '' || contents === '') {
        alert('제목과 내용을 모두 입력해주세요.');
        return;
      }
      await axios.post('/api/articles/', newArticle).then(res => {
        setQuestionData((prevQuestionData: QuestionDataType[]) => [
          ...prevQuestionData,
          res.data, // Add the new question to the Recoil state
        ]);
        alert('질문 등록 성공!');
        navigate(`/articles/${res.data._id}`);
      });
    } catch (error) {
      console.error(error);
      alert('질문 등록 실패!');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewArticle({ ...newArticle, title: e.target.value });
  };

  useEffect(() => {
    // console.log(contents);
    setNewArticle({ ...newArticle, content: contents });
  }, [contents]);

  // selected 배열의 길이를 5로 제한
  useEffect(() => {
    if (selected.length > 3) {
      alert('키워드는 최대 3개까지 입력가능합니다');
      setSelected(selected.slice(0, 3));
    }
  }, [selected]);
  return (
    <QuestionForm>
      <QuestionTitleSection>
        <QuestionTypo>Q</QuestionTypo>
        <QuestionTitleInput
          placeholder="질문 내용을 명확하게 요약하여 작성해주세요."
          value={newArticle.title}
          onChange={handleTitleChange}
        />
      </QuestionTitleSection>
      <ReactQuill
        ref={element => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
      {/* </QuestionContentSection> */}
      <QuestionKeywordSection>
        <HashtagIcon />
        <TagsInput value={selected} onChange={setSelected} name="hashtags" placeHolder="키워드를 입력해주세요." />
      </QuestionKeywordSection>
      <Button alignself="flex-end" type="button" onClick={postQuestion}>
        질문등록
      </Button>
    </QuestionForm>
  );
};
