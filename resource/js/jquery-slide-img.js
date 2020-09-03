/**
 * 이미지 6개씩 노출
 * 이미지 비율 3:2
 * 정렬(새로고침 필요할 듯)
 *   주요 실적순 - 관리자에서 지정
 *   최근 실적순 - 최근 등록한 순
 * pj명 검색 기능
 * 썸네일, +버튼 클릭 시(다시 클릭하면 닫기)
 *   썸네일 하단에 상세 이미지 영역 열기
 * 더보기 버튼 클릭 시 6개씩 추가 노출
 * 좌, 우 버튼 클릭시 다음 목록사항으로 이동(내부 이미지 이동이 아님)
 *   행이 바뀔 시(3n)에는 다음 행으로 이동하면서 이미지 열기
 * 하나의 썸네일 당 10개까지 상세이미지 등록 가능
 */

var SlideThumb = (function () {
    // defaults options
    var defaults = {
        column: 5
    };

    /**
     * 목록 인덱싱
     */
    function setIdx(el, column) {
        el.find('.img_thumb').each(function (idx, item) {
            var idxRow = Math.floor(idx / column) + 1;
            $(item).attr('data-idx', idx + 1);
            $(item).attr('data-idx-row', idxRow);
        });
    }
    /**
     * 뷰어 생성
     */
    function makeViewer(el) {
        var _html = [];
        _html.push('<div class="img_viewer">');
        _html.push('    <div class="img_box">');
        _html.push('        <div class="img">');
        _html.push('            <img src="" alt="이미지">');
        _html.push('        </div>');
        _html.push('        <div class="arrow">');
        _html.push('            <button class="btn_prev">이전</button>');
        _html.push('            <button class="btn_next">다음</button>');
        _html.push('        </div>');
        _html.push('    </div>');
        _html.push('    <div class="info">');
        _html.push('        <div class="subject">제목</div>');
        _html.push('        <div class="cont">내용</div>');
        _html.push('    </div>');
        _html.push('</div>');
        _html = _html.join('');

        el.find('.img_list').append(_html);
    }
    /**
     * 뷰어 열기
     * @param {number} index 열려야 할 index
     */
    function openViewer(index) {

    }
    /**
     * 뷰어 닫기
     */
    function closeViewer() {

    }
    /**
     * 뷰어 위치 이동
     * @param {obeject} el 상위 부모
     * @param {obeject} viewer 뷰어 요소
     * @param {obeject} idx 이동해야 할 위치
     */
    function moveViewer(el, viewer, idx) {
        el.find('.img_thumb[data-idx-row="' + idx + '"]').last().after(viewer);
    }
    /**
     * 이미지 변경
     * @param {obeject} el
     */
    function changeBigImg(el, imgUrl) {
        el.find('.img').find('img').attr('src', imgUrl); // 이미지 변경
    }
    /**
     * 스크롤 이동
     * @param {boolean} animation 효과 유 무 설정
     */
    function moveScroll(el, animation) {
        var _top = el.offset().top - 20;

        if (animation) {
            $('html, body').stop().animate({ scrollTop: _top }, 300);
        } else {
            $('html, body').scrollTop(_top);
        }
    }

    function SlideThumb(elems, options) {
        $.extend(defaults, options);
        this.elems = $(elems);
        this.options = defaults;

        var imgUrl = '';
        var $elems = $(elems);

        makeViewer($elems);

        var _col = options.column;
        var $viewer = $elems.find('.img_viewer');

        console.log('SlideThumb Run.');

        setIdx($elems, _col); // 목록 인덱싱

        // 목록 선택
        $elems.on('click', '.btn_thumb', function () {
            var $list = $(this).parent();
            if (!$list.hasClass('active')) {
                // 뷰어 열기
                $list.addClass('active').siblings().removeClass('active');
                $viewer.addClass('open').stop().slideDown();
            } else {
                // 뷰어 닫기
                $list.removeClass('active');
                $viewer.addClass('open').stop().slideUp();
                return;
            }
            imgUrl = $(this).find('img').attr('src'); // 썸네일 이미지
            var idx = $list.data('idx'); // 선택 요소 index
            var idxRow = $list.data('idxRow'); // 선택 요소 컬럼

            console.log(imgUrl + ', 컬럼: ' + _col + ', index: ' + idx + ', Row: ' + idxRow);

            changeBigImg($viewer, imgUrl); // 뷰어 이미지 변경
            moveViewer($elems, $viewer, idxRow); // 뷰어 위치 이동
            moveScroll($list, true); // 스크롤 맞춤
        });
    }

    // 강제 생성자 선언 :: new 키워드 누락 방지
    SlideThumb.factory = function (elems, options) {
        return new SlideThumb(elems, options);
    };

    var _proto = SlideThumb.prototype;

    /**
     * udpate attribute, event
     * @todo 요소 추가 됐을 때 갱신 필요
     */
    _proto.update = function () {
        var slideThumb = this;
        var $elems = slideThumb.elems;
        var options = slideThumb.options;
        var _col = options.column;

        setIdx($elems, _col); // 목록 인덱싱

        console.log('update');
    };

    /**
     * destroy
     */
    _proto.destroy = function () {
        var slideThumb = this;
        var $elems = slideThumb.elems;

        $elems.find('.img_thumb').removeAttr('data-idx').removeAttr('data-idx-row');

        console.log('destroy');
    };

    return SlideThumb.factory;
})();