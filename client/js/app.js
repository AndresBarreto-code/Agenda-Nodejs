
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
            this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento.id;
        $.post('/events/delete/'+eventId, {id: eventId}, (response) => {
            alert(response);
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let title = $('#titulo').val(),
                start = $('#start_date').val(),                
                allDay=true,
                end = $('#end_date').val(),
                start_hour = $('#start_hour').val(),
                end_hour = $('#end_hour').val();
            let startC = start + ' ' + start_hour;
            let endC = end + ' ' + end_hour;
            if (!$('#allDay').is(':checked')) {
                allDay=false;    
            }
            
            let eventoPost={
                title: title,
                start: start,
                startTime: start_hour,
                end: end,
                endTime: end_hour,
                allDay: allDay
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                $.post(url, eventoPost, (response) => {
                    let eventoCal = {
                        id:response.id,
                        title: title,
                        start: startC,
                        end: endC,
                        allDay: allDay
                    }
                    $('.calendario').fullCalendar('renderEvent', eventoCal)
                });                
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/trash-open.png").attr('style', "width:12%");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                console.log(event.id);
                $('.delete').find('img').attr('src', "img/delete.png");
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event.id);
                    }
                }
            })
        }
    }

    const Manager = new EventManager()
