$(function() {
    var $collectionHolder;
    var isDown = false;

    // setup an "add a shift" link
    var linkText = Translator.trans('add_shift');
    var $addShiftLink = $('<a class="add_shift_link pull-right btn btn-primary btn-sm" href="#"><i class="fa fa-plus" aria-hidden="true"></i> ' + linkText + '</a>');
    var $newLinkLi = $('<div></div>').append($addShiftLink);

    // Get the ul that holds the collection of shifts
    $collectionHolder = $('ul.shifts');

    // add the "add a shift" anchor and li to the shifts ul
    $collectionHolder.append($newLinkLi);

    // count the current form inputs we have (e.g. 2), use that as the new
    // index when inserting a new item (e.g. 2)
    $collectionHolder.data('index', $collectionHolder.find(':input').length);

    $addShiftLink.on('click', function(e) {
        // prevent the link from creating a "#" on the URL
        e.preventDefault();

        // add a new shift form (see next code block)
        addShiftForm($collectionHolder, $newLinkLi);
        addDatePicker();
        addCross();
    });

    $('.shifts > li').each(function (key, el) {
      $(el).prepend(cross);
    });

    $('.close').each(function (key, el) {
        $(el).click(function (e) {
            $(this).parent().remove();
        });
    });

    addDragFunctionality();
});

function addShiftForm($collectionHolder, $newLinkLi) {
    // Get the data-prototype explained earlier
    var prototype = $collectionHolder.data('prototype');

    // get the new index
    var index = $collectionHolder.data('index');

    // Replace '__name__' in the prototype's HTML to
    // instead be a number based on how many items we have
    var newForm = prototype.replace(/__name__/g, index);

    // increase the index with one for the next item
    $collectionHolder.data('index', index + 1);

    // Display the form in the page in an li, before the "Add a shift" link li
    var $newFormLi = $('<li class="animated fadeIn card"></li>').append(newForm);
    $newLinkLi.before($newFormLi);
}

function addDatePicker() {
    $('.datepicker').each(function (index, value) {
        $(value).datepicker();
    });
}

var cross = '<div class="d-flex justify-content-between"><i class="fa fa-bars drag-handle" aria-hidden="true"></i><i class="fa close fa-times" aria-hidden="true"></i></div>';
function addCross(){
    $('.shifts > li').last().prepend(cross);
    $('.close').click(function (e) {
        $(this).parent().remove();
    });
}

function addDragFunctionality() {
    $('.shifts').sortable({
        handle: '.drag-handle',
        start: startDrag(),
        end: endDrag(),
        scrollSpeed: 10,
        cursorAt: { top: 0, left: 0 }
    });
}

function startDrag() {
    $('.drag-handle').mousedown(function (e) {
        isDown = true;
        $('.shifts li > div:nth-child(2)').each(function (key, el) {
            $(el).hide();
            console.log($(el).first().children().eq(1).val());
        })
    });
}

function endDrag() {
    $(document).mouseup(function (e) {
        if(isDown) {
            $('.shifts li > div:nth-child(2)').each(function (key, el) {
                $(el).show();
                $(el).addClass('animated').addClass('fadeIn');
            });
            isDown = false;
        }
    });
}