// jQuery表单验证
$(document).ready(function() {
    $('#bookForm').on('submit', function(e) {
        var isValid = true;
        
        // 清除之前的错误提示
        $('.error-tip').remove();
        $('input, select').removeClass('error');
        
        // 验证必填字段
        $(this).find('input[required], select[required]').each(function() {
            var $input = $(this);
            var value = $.trim($input.val());
            
            if (!value) {
                isValid = false;
                $input.addClass('error');
                var label = $input.prev('label').text().replace('*', '').trim();
                $input.after('<div class="error-tip">' + label + '不能为空</div>');
            }
        });
        
        // 验证图书编号格式
        var $bookCode = $('input[name="bookCode"]');
        if ($bookCode.length && $.trim($bookCode.val())) {
            var code = $.trim($bookCode.val());
            if (code.length > 50) {
                isValid = false;
                $bookCode.addClass('error');
                $bookCode.after('<div class="error-tip">图书编号不能超过50个字符</div>');
            }
        }
        
        // 验证图书名称长度
        var $bookName = $('input[name="bookName"]');
        if ($bookName.length && $.trim($bookName.val())) {
            var name = $.trim($bookName.val());
            if (name.length > 100) {
                isValid = false;
                $bookName.addClass('error');
                $bookName.after('<div class="error-tip">图书名称不能超过100个字符</div>');
            }
        }
        
        if (!isValid) {
            e.preventDefault();
            // 滚动到第一个错误位置
            var $firstError = $('.error').first();
            if ($firstError.length) {
                $('html, body').animate({
                    scrollTop: $firstError.offset().top - 100
                }, 300);
            }
        }
    });
    
    // 实时清除错误提示
    $('input, select').on('input change', function() {
        var $input = $(this);
        if ($.trim($input.val())) {
            $input.removeClass('error');
            $input.next('.error-tip').remove();
        }
    });
});
