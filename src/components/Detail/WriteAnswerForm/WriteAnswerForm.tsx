import ReactQuill from "react-quill";
import { Root, Title } from "./styled";
import React, { useRef, useState } from "react";
import modules from "../../../utils/quillModules";
import { Button } from "../../Button";

type Props = {
  ref: React.Ref<HTMLDivElement>;
  contents: string;
  setContents: (value: string) => void;
  postAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  editingAnswerId?: string | null;
};

export const WriteAnswerForm: React.FC<Props> = (props, ref) => {
  const QuillRef = useRef<ReactQuill>();

  return (
    <Root ref={ref}>
      <Title>답변 작성하기</Title>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={props.contents}
        onChange={props.setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        style={{ height: "300px" }}
      />
      <Button alignself="flex-end" height="44px" onClick={props.postAnswer}>
        {props.editingAnswerId ? "답변수정" : "답변작성"}
      </Button>
    </Root>
  );
};
