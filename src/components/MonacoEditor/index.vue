/*
 * @Author: liuhanchuan 
 * @Date: 2022-11-17 11:18:24 
 * @Last Modified by:   liuhanchuan 
 * @Last Modified time: 2022-11-17 11:18:24
 * 在线编辑器
 */

<template>
  <div ref="editorContainer" class="editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor';
export default {
  name: 'MonacoEditor',
  data() {
    return {
      code: '',
      editor: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 初始化编辑器
      this.editor = monaco.editor.create(this.$refs.editorContainer, {
        value: this.code,
        language: 'javascript',
        tabSize: 2,
        scrollBeyondLastLine: false,
        automaticLayout: true, // 自动布局
        readOnly: false
      })

      // 监听内容变化
      this.editor.onDidChangeModelContent((e) => {
        
      })

      // 监听失去焦点事件
      this.editor.onDidBlurEditorText((e) => {
        
      });
    },
    // 获取编辑框内容
    getCodeContext() {
      return this.editor.getValue()
    },
    // 自动格式化代码
    format() {
      this.editor.trigger('anything', 'editor.action.formatDocument')
      // 或者
      // this.editor.getAction(['editor.action.formatDocument']).run()
    },
    changeEditor() {
      if (this.editor === null) {
        this.init()
      }

      const oldModel = this.editor.getModel()
      const newModel = monaco.editor.createModel(
        this.code,
        'javascript'
      )

      if (oldModel) {
        oldModel.dispose()
      }
      this.editor.setModel(newModel)
    }
  }
}
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>