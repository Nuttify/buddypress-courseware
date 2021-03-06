/**
 * Javascript calls for schedule screens
 */

// Localize DateTimePicker
dtpLanguage['monthNames'] = dtpLanguage['monthNames'].split( ',' );
dtpLanguage['dayNamesMin'] = dtpLanguage['dayNamesMin'].split( ',' );
dtpLanguage['firstDay'] = eval( dtpLanguage['firstDay'] );
dtpLanguage['isRTL'] = eval( dtpLanguage['isRTL'] );
dtpLanguage['showMonthAfterYear'] = eval( dtpLanguage['showMonthAfterYear'] );
jQuery.datepicker.setDefaults( dtpLanguage );

// This will enable the calendar for start date field
jQuery( "input[name$='schedule[start_date]']" ).datetimepicker({
    holdDatepickerOpen: true,
    showButtonPanel: true,
    timeFormat: 'hh:mm:ss',
    dateFormat: 'yy-mm-dd'
});

// Function will check the start date field and ensure the end date will not be older
function courseware_toggle_datefields( reset ) {
    if( reset == true ) {
        var title = jQuery( "input[name$='schedule[end_date]']" ).attr('title');
        jQuery( "input[name$='schedule[end_date]']" ).val(title);
    }
    
    jQuery( "input[name$='schedule[end_date]']" ).datepicker('destroy');
    var start_date = jQuery( "input[name$='schedule[start_date]']" ).datepicker('getDate');
    if( start_date != null ) {
        jQuery( "input[name$='schedule[end_date]']" ).datetimepicker({
            holdDatepickerOpen: true,
            showButtonPanel: true,
            timeFormat: 'hh:mm:ss',
            dateFormat: 'yy-mm-dd',
            minDate: start_date
        });
        jQuery( "form #new-schedule-end-date" ).show();
    }
}

// This will enable calendar for end date field on edit screen
var cw_start_date = jQuery( "input[name$='schedule[start_date]']" ).val();
if( cw_start_date != null )
    courseware_toggle_datefields( false );

// This will enable the calendar for end date field
// but only if start date field is populated
jQuery( "form #new-schedule-end-date" ).hide();
jQuery( "input[name$='schedule[start_date]']" )
    .bind( 'change', function() { courseware_toggle_datefields( true ) });

/* Editor Screens */
jQuery('#new-assignment-form label').hide();
jQuery('#new-assignment-form input[type="text"]').inputHint();
jQuery('#new-assignment-form textarea').inputHint();

// Didn't find another way to 'localize' this
oLanguage.oPaginate             = [];
oLanguage.oPaginate.sFirst      = '&laquo;';
oLanguage.oPaginate.sPrevious   = '&lsaquo;';
oLanguage.oPaginate.sNext       = '&rsaquo;';
oLanguage.oPaginate.sLast       = '&raquo;';

// Load DataTables
jQuery("table.datatables").dataTable( {
    "bJQueryUI": true,
    "oLanguage": oLanguage,
    "aaSorting": [[ 1, "desc" ]],
    "sPaginationType": "full_numbers"
} );