import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useRef, useState, ReactNode, ChangeEvent } from 'react';
import { uploadImage } from '../../lib/adminApi';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        active ? 'bg-[#004E99] text-white' : 'text-[#414752] hover:bg-[#f0f3ff]'
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: 'rounded-xl max-w-full' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-[#0066CC] underline' } }),
      Placeholder.configure({ placeholder: 'Start writing your post...' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'rich-content focus:outline-none min-h-[320px] px-6 py-5',
      },
    },
  });

  async function handleImageFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow selecting the same file again later
    if (!file || !editor) return;

    setUploadError('');
    setUploading(true);
    try {
      const { url } = await uploadImage(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err: any) {
      setUploadError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  }

  function handleSetLink() {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Link URL', previousUrl || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  if (!editor) return null;

  return (
    <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-100 px-3 py-2 bg-[#F8FAFC]">
        <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <span className="italic">I</span>
        </ToolbarButton>
        <ToolbarButton label="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <span className="line-through">S</span>
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton label="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </ToolbarButton>
        <ToolbarButton label="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </ToolbarButton>
        <ToolbarButton label="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>
        </ToolbarButton>
        <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><path d="M4 6h1v4M4 10h2M4.5 14h1.5a1 1 0 0 1 0 2H5m1 0a1 1 0 0 1 0 2H4" fill="none"/></svg>
        </ToolbarButton>
        <ToolbarButton label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          "
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <ToolbarButton label="Link" active={editor.isActive('link')} onClick={handleSetLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </ToolbarButton>
        <ToolbarButton label="Insert image" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          {uploading ? (
            <div className="w-4 h-4 border-2 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          )}
        </ToolbarButton>
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageFileSelected} className="hidden" />
      </div>

      {uploadError && (
        <div className="px-6 py-2 text-xs font-medium text-red-600 bg-red-50 border-b border-red-100">{uploadError}</div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
