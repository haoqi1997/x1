(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5dae9df2"],{"064c":function(e,t,i){},"23c6":function(e,t,i){"use strict";i.r(t);var s,l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"buttons"},[i("div",{staticClass:"buttons"},[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:7}},[i("el-input",{attrs:{placeholder:"请输入标题",clearable:""},on:{clear:e.getUserList},model:{value:e.ofgettitle,callback:function(t){e.ofgettitle=t},expression:"ofgettitle"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getUserList},slot:"append"})],1)],1),i("el-col",{attrs:{span:4,id:"user_add"}},[i("el-button",{attrs:{type:"primary"},on:{click:e.adduser}},[e._v("添加文章")])],1)],1)],1)]),i("div",{staticClass:"mian"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.ofloading,expression:"ofloading"}],staticStyle:{width:"100%"},attrs:{data:e.oftableData,"row-class-name":"warning-row",border:"","element-loading-text":"正在获取列表，请稍等..."}},[i("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),i("el-table-column",{attrs:{prop:"title",label:"标题"}}),i("el-table-column",{attrs:{prop:"orderNum",label:"排序"}}),i("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(i){return e.handleEdit(t.$index,t.row.id)}}}),i("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(i){return e.handleDelete(t.$index,t.row.id)}}})]}}])})],1),i("CtrlPage",{directives:[{name:"show",rawName:"v-show",value:0<e.oftableData.length,expression:"0 < oftableData.length"}],ref:"page",attrs:{setPage:e.getList}})],1),i("el-dialog",{attrs:{title:"添加",visible:e.addFormVisible},on:{"update:visible":function(t){e.addFormVisible=t}}},[i("el-form",{ref:"dateForm",attrs:{model:e.form,rules:e.rules}},[i("div",{staticStyle:{display:"flex","justify-content":"space-evenly"}},[i("div",[i("el-form-item",{attrs:{label:"标题","label-width":e.formLabelWidth,prop:"title"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),i("el-form-item",{attrs:{label:"序号","label-width":e.formLabelWidth,prop:"orderNum"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.orderNum,callback:function(t){e.$set(e.form,"orderNum",e._n(t))},expression:"form.orderNum"}})],1)],1),i("div",[i("el-upload",{class:{hide:e.hideUpload},attrs:{action:e.uploadUrl,"list-type":"picture-card","on-success":e.handleSuccess,headers:e.importHeaders,"on-remove":e.handleRemove,name:"files","on-change":e.handleChange,"file-list":e.imgFilesList}},[i("i",{staticClass:"el-icon-plus"})])],1)]),i("div",{staticStyle:{"margin-top":"50px",position:"relative"}},[i("quill-editor",{ref:"addQuillEditor",staticClass:"editor",attrs:{id:56565,options:e.editorOption},model:{value:e.form.detailHtml,callback:function(t){e.$set(e.form,"detailHtml",t)},expression:"form.detailHtml"}})],1)]),i("el-dialog",{attrs:{width:"30%",title:"上传图片",visible:e.addVisible,"append-to-body":""},on:{"update:visible":function(t){e.addVisible=t}}},[i("el-upload",{class:{hide:e.hideUpload},attrs:{action:e.uploadUrl,"list-type":"picture-card","on-success":e.editorSuccess,"on-change":e.handleChange,"on-remove":e.handleRemove,headers:e.importHeaders,name:"files","file-list":e.editorimgFilesList}},[i("i",{staticClass:"el-icon-plus"})]),i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}}),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.addVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.addSuccess}},[e._v("确 定")])],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.addFormVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("dateForm")}}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"修改",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"dateForm",attrs:{model:e.form,rules:e.rules}},[i("div",{staticStyle:{display:"flex","justify-content":"space-evenly"}},[i("div",[i("el-form-item",{attrs:{label:"标题","label-width":e.formLabelWidth,prop:"title"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),i("el-form-item",{attrs:{label:"序号","label-width":e.formLabelWidth,prop:"orderNum"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.orderNum,callback:function(t){e.$set(e.form,"orderNum",e._n(t))},expression:"form.orderNum"}})],1)],1),i("div",[i("el-upload",{class:{hide:e.hideUpload},attrs:{action:e.uploadUrl,"list-type":"picture-card","on-success":e.handleSuccess,"on-change":e.handleChange,headers:e.importHeaders,"on-remove":e.handleRemove,limit:1,name:"files","file-list":e.imgFilesList}},[i("i",{staticClass:"el-icon-plus"})])],1)]),i("div",{staticStyle:{"margin-top":"50px",position:"relative"}},[i("quill-editor",{ref:"myQuillEditor",staticClass:"editor",attrs:{id:56562565,options:e.editorOption},model:{value:e.form.detailHtml,callback:function(t){e.$set(e.form,"detailHtml",t)},expression:"form.detailHtml"}})],1)]),i("el-dialog",{attrs:{width:"30%",title:"上传图片",visible:e.innerVisible,"append-to-body":""},on:{"update:visible":function(t){e.innerVisible=t}}},[i("el-upload",{attrs:{action:e.uploadUrl,"list-type":"picture-card","on-success":e.editorSuccess,headers:e.importHeaders,name:"files","file-list":e.editorimgFilesList}},[i("i",{staticClass:"el-icon-plus"})]),i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}}),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.innerVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.Success}},[e._v("确 定")])],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.putbeforeorsince("dateForm")}}},[e._v("确 定")])],1)],1)],1)},o=[],a=(i("d81d"),i("ade3")),r=i("ed35"),n=i("5f87"),d={name:"",data:function(){return{hideUpload:!1,limitCount:1,addVisible:!1,innerVisible:!1,editorimg:[],editorimgFilesList:[],formLabelWidth:"120px",ofloading:!0,ofgettitle:"",oftableData:[],editUserForm:"",dialogFormVisible:!1,addFormVisible:!1,ids:"",form:{detailHtml:"",orderNum:"",picture:"",title:"",username:""},uploadUrl:"".concat(window.apiBase,"/file/uploadFiles"),importHeaders:{token:Object(n["a"])().token},dialogVisible:!1,dialogImageUrl:"",fileList:[],imgFilesList:[],rules:{title:[{required:!0,message:"请输入标题名称",trigger:"blur"}],orderNum:[{required:!0,message:"请输入序号",trigger:"blur"},{type:"number",message:"序号必须为数字值"}]},editorOption:{},quilllength:""}},created:function(){},mounted:function(){this.$refs.page.getList(1)},methods:(s={handleChange:function(e,t){this.hideUpload=t.length>=this.limitCount,console.log("handleChange -> hideUpload",this.hideUpload)},editorSuccess:function(e){console.log("editorSuccess -> res",e),this.editorimg.push(e.data[0])},getContent:function(){console.log("content",this.content)},onEditorBlur:function(e){console.log("$event",e)},onEditorFocus:function(e){console.log("$event",e)},handleRemove:function(e,t){var i=this;i.imgList=[],this.hideUpload=t.length>=this.limitCount,t.map((function(e){i.imgList.push(e.response.data[0])}))},handleSuccess:function(e){console.log("handleSuccess -> res",e),this.fileList.push(e.data[0]),this.form.picture=this.fileList[0]},getUserList:function(){},adduploads:function(){this.quilllength="";var e=this.$refs.addQuillEditor.quill;this.quilllength=e.getSelection().index||0,console.log("uploads ->  quill.getSelection()",e.getSelection()),this.addVisible=!0},uploads:function(){var e=this.$refs.myQuillEditor.quill;this.quilllength=e.getSelection().index||0,this.innerVisible=!0},addSuccess:function(){this.addVisible=!1;var e=this.editorimg[0],t=this.$refs.addQuillEditor.quill;e?(t.insertEmbed(this.quilllength,"image",e),t.setSelection(this.quilllength+1),this.editorimgFilesList=[]):Message.error("图片插入失败")},Success:function(){this.innerVisible=!1;var e=this.editorimg[0];console.log("Success -> res",e);var t=this.$refs.myQuillEditor.quill;e?(t.insertEmbed(this.quilllength,"image",e),t.setSelection(this.quilllength+1),this.editorimgFilesList=[]):Message.error("图片插入失败")},adduser:function(){var e=this;e.hideUpload=!1,this.form={detailHtml:"",orderNum:0,picture:"",title:"",username:""},this.imgFilesList=[],this.addFormVisible=!0},editUser:function(){}},Object(a["a"])(s,"getUserList",(function(){this.$refs.page.getList(1)})),Object(a["a"])(s,"handleEdit",(function(e,t){var i=this;this.ids=t,this.imgFilesList=[],this.$public.InRegards.inquirebeforeorsincedetails(t).then((function(e){"000000"==e.code&&(i.form=e.data,i.imgFilesList.push({url:e.data.picture,name:e.data.title,id:e.data.id}),i.hideUpload=i.imgFilesList.length>=i.limitCount,i.dialogFormVisible=!0)}))})),Object(a["a"])(s,"putbeforeorsince",(function(e){var t=this,i={detailHtml:this.form.detailHtml,orderNum:this.form.orderNum,picture:this.form.picture,title:this.form.title,username:this.form.username};this.$refs[e].validate((function(s){s&&t.$public.InRegards.putbeforeorsince(t.ids,i).then((function(i){"000000"==i.code&&(t.$$message({message:"修改成功！",type:"success"}),t.dialogFormVisible=!1,t.$refs.page.getList(1),t.$refs[e].resetFields())}))}))})),Object(a["a"])(s,"handleDelete",(function(e,t){var i=this;this.$confirm("此操作将永久删除该文章, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){i.$public.InRegards.DELETEbeforeorsince(t).then((function(e){console.log("handleDelete -> res",e),"000000"==e.code&&(i.$message({message:"恭喜你，删除成功",type:"success"}),i.$refs.page.getList(1))}))})).catch((function(){i.$message({type:"info",message:"已取消删除"})}))})),Object(a["a"])(s,"getList",(function(e,t,i){var s=this;this.$public.InRegards.inquirebeforeorsince({current:e,name:this.getUser,title:this.ofgettitle,size:t}).then((function(e){"000000"==e.code&&(s.oftableData=e.data.records,s.ofloading=!1,i(s.oftableData,+e.data.total))}))})),Object(a["a"])(s,"submitForm",(function(e){var t=this;this.$refs[e].validate((function(i){if(!i)return console.log("error submit!!"),!1;t.form.username=JSON.parse(localStorage.getItem("menuList")).userVo.username,t.$public.InRegards.allbeforeorsince(t.form).then((function(i){"000000"==i.code&&(t.$$message({message:"添加成功！",type:"success"}),t.addFormVisible=!1,t.$refs[e].resetFields(),t.$refs.page.getList(1))}))}))})),s),components:{CtrlPage:r["a"]}},c=d,u=(i("9e49"),i("2877")),m=Object(u["a"])(c,l,o,!1,null,null,null);t["default"]=m.exports},"9e49":function(e,t,i){"use strict";var s=i("064c"),l=i.n(s);l.a},ed35:function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-pagination",{attrs:{"current-page":e.pageIndex,"page-sizes":e.pageSizes,"page-size":e.rows,layout:"total, sizes, prev, pager, next, jumper",total:e.total,"prev-text":"上一页","next-text":"下一页"},on:{"size-change":e.onSizeChange,"current-change":e.onCurrentChange}})},l=[],o=(i("a9e3"),{props:{pageSizes:{type:Array,default:function(){return[5,10,20,50,100]}},rows:{type:Number,default:10},setPage:{type:Function}},watch:{rows:function(){this.currentRows=this.rows}},data:function(){return{currentRows:this.rows,pageIndex:1,total:0}},methods:{onSizeChange:function(e){this.currentRows=e,this.getList(1)},onCurrentChange:function(e){this.getList(e)},setResultCallback:function(e,t){0==e.length&&this.pageIndex>1?this.getList(this.pageIndex-1):this.total=t},getList:function(e){this.setPage&&(this.pageIndex=e,this.setPage(e,this.currentRows,this.setResultCallback))},refresh:function(){this.getList(this.pageIndex)}}}),a=o,r=i("2877"),n=Object(r["a"])(a,s,l,!1,null,null,null);t["a"]=n.exports}}]);