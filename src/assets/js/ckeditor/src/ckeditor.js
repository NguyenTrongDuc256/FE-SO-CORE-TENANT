/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize.js';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import fullscreenIcon from '../../../images/svg/icon-fullscreen.svg';
import iconFileManager from '../../../images/svg/icon-folder.svg';
class Editor extends ClassicEditor {}


class OpenFileManager extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('openFileManager', (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: 'openFileManager',
        icon: iconFileManager,
        tooltip: true,
      });

      view.on('execute', () => {
        editor.AngularCkEditorStandarComponent.ckeditorPluginButtonShowBlobFileManagement();
      });
      return view;
    });
  }
}

class FullScreen extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('fullScreen', (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: 'Fullscreen',
        icon: fullscreenIcon,
        tooltip: true,
      });

      let etat = 0;
      view.on('execute', () => {
        if (etat == 1) {
          editor.sourceElement.nextElementSibling.removeAttribute('id');
          document.body.removeAttribute('id');
          etat = 0;
        } else {
          editor.sourceElement.nextElementSibling.setAttribute('id','fullscreeneditor');
          document.body.setAttribute('id', 'fullscreenoverlay');
          etat = 1;
        }
      });

      return view;
    });
  }
}


// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	AutoImage,
	Bold,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Highlight,
	HorizontalLine,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	MediaEmbed,
	MediaEmbedToolbar,
	PageBreak,
	Paragraph,
	SpecialCharacters,
	SpecialCharactersEssentials,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TodoList,
	Underline,
  FullScreen,
  OpenFileManager,
  SimpleUploadAdapter,
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'|',
			'fontSize',
			'fontBackgroundColor',
			'fontColor',
			'fontFamily',
			'highlight',
			'|',
			'numberedList',
			'todoList',
			'bulletedList',
			'|',
			'outdent',
			'indent',
			'alignment',
			'pageBreak',
			'|',
			// 'imageUpload',
			// 'imageInsert',
			'mediaEmbed',
			'link',
			'specialCharacters',
			'findAndReplace',
			'insertTable',
			'|',
      'fullScreen',
      'openFileManager'
		]
	},
	language: 'en',
	image: {
		toolbar: [
			'imageTextAlternative',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'linkImage'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	},
  // simpleUpload: {
  //   uploadUrl: "https://so-identity.k8s-dev.omt.vn/api/common/upload-file",
  //   // uploadUrl: "https://exam.test.api.be.elearn.vn/api/common/upload-file",
  //   withCredentials: false,
  //   headers: {
  //     "access-control-allow-origin": "*",
  //     "layout": "tenant",
  //     "schoolyearid": "988e1ff5-05b1-4f89-9233-a3e72572f26b",
  //     // "content-type": "multipart/form-data",
  //     // "content-length": 647,
  //     // "content-type": "application/json;charset=ISO-8859-1",
  //     "Authorization": "Bearer " + localStorage.getItem('Token')
  //   }
  // },
};

export default Editor;
