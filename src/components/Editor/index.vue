<template>
    <div>
        <quill-editor ref="myQuillEditor" v-model="editorContent"/>
    </div>
</template>
<script>
	// import {ossUpload, uploadImg} from '@/api/public'
	// import '../../../static/tinymce/tinymce'
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	import { quillEditor } from 'vue-quill-editor'
	export default {
		name: 'TinyMceView',
		components: {
			quillEditor
		},
        data() {
            return {
            	editorContent : ''
            }
        },
        // 双向数据绑定
        model : {
            prop : 'content',
            event : "parent-event"
        },
        props : ['content', 'editorRef'],

		mounted() {
			// ref转发
            this.$emit("update:editorRef", this.$refs.myQuillEditor);
		},
		watch : {
			editorContent(newVal, oldVal) {
                this.$emit("parent-event", newVal);
            },
            content(newVal, oldVal) {
                this.editorContent = newVal;
            }
        }
	}
</script>
