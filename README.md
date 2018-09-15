##jsFormValidateNative
原生编写校验表单，错误的时候会在校验元素下面添加p标签，给与提示。
<pre>
var inputs =document.querySelectorAll('.checkarea');
valiCheckForm(inputs);//实时校验
valiFormSubmit(inputs,callback);//全部成功后，进行回调
</pre>

##其他
也完全可以修改后，用export导出，import导入使用。

[地址:https://flymie.github.io/jsFormValidateNative/](https://flymie.github.io/jsFormValidateNative/)
