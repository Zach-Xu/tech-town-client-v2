import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg'
const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

import React, { useState, useEffect } from 'react'
import { convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
const htmlToDraft = typeof window === 'object' && require('html-to-draftjs').default;
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


type Props = {
  content: string
  setContent: (state: string) => any
}

const TextEditor = ({ content, setContent }: Props) => {

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [isFocus, setIsFocus] = useState<boolean>(false)

  useEffect(() => {
    const html = content;
    if (html === undefined) return;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [content]);

  return (
    <div className='hover:cursor-text'>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorStyle={{
          marginTop: '20px',
          minHeight: '200px',
          border: isFocus ? '1px solid rgb(205, 223, 237)' : '1px solid lightgray',
          padding: '0px 10px',
          boxShadow: isFocus ? '0 0 0 4px rgb(205, 223, 237, 0.4)' : '',
          backgroundColor: 'white'
        }}
        onFocus={() => setIsFocus(true)}
        onEditorStateChange={editorState => setEditorState(editorState)}
        onBlur={() => {
          setIsFocus(false)
          setContent(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
          );
        }}
      />
    </div>
  )
}

export default TextEditor