// //practice
function handleFile(evt) {
    var files = evt.target.files; // FileList object

    //tạo vòng lặp để hiển thị hình
    for (var i = 0, f; f = files[i]; i++) {

        //chọn những file là hình ảnh đúng thì else sai thì if và tiếp tục
        if (!f.type.match('image.*')) {
            break;
        }

        var reader = new FileReader();

        //lấy thông tin file
        reader.onload = (function (theFile) {
            return function (e) {
                //hiển thị hình theo dạng thu nhỏ.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" id="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>', '<i class="fa fa-times" id="remove" ></i>'
                ].join('');

                document.getElementById('previewImg').insertBefore(span, null);
            };
        })(f);

        //đọc đường dẫn để xuất hình
        reader.readAsDataURL(f);
        $('#files').val(null);
    }
}
document.getElementById('files').addEventListener('change', handleFile, false);
$('.btn-add').click(function () {
    $('.file').click();
});

//xoá hình ảnh qua nút x 
//parent lấy thẻ đầu tiên bao bọc; parents sẽ lấy hết các thẻ bao bọc
//closest sẽ lấy nguồn gốc đầu tiên của thẻ ta chỉ định
$(document).on('click', '#remove', function () {
    if (confirm('Are you sure?')) {
        $(this).closest('span').empty();
        $('#files').val(null);
    }
    return false;
})