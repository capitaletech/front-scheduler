import React from 'react';
import './App.css';
import {
    ScheduleComponent,
    Inject,
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    MonthAgenda,
    DragAndDrop,
    Resize,
    EventSettingsModel,
    DragEventArgs,
    ResizeEventArgs,
    ScrollOptions,
    NavigateOptions,
    ViewsDirective,
    ViewDirective,
    PopupOpenEventArgs,
    EventRenderedArgs,
    RenderCellEventArgs
} from "@syncfusion/ej2-react-schedule";
import {DataManager, WebApiAdaptor, UrlAdaptor} from "@syncfusion/ej2-data";
import {DateTimePickerComponent} from "@syncfusion/ej2-react-calendars";
import {extend, L10n} from '@syncfusion/ej2-base';

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Add',
            'cancelButton': 'Close',
            'deleteButton': 'Remove',
            'newEvent': 'Book a meeting',
        },
    }
});

class App extends React.Component {
    private localData: EventSettingsModel = {
        dataSource: [
            {
                id: 1,
                Subject: "Test 1",
                StartTime: new Date(2021, 7, 6, 10, 30),
                EndTime: new Date(2021, 7, 6, 12, 30)
            },
            {
                id: 2,
                Subject: "Test 2",
                StartTime: new Date(2021, 7, 6, 14, 30),
                EndTime: new Date(2021, 7, 6, 16, 30)
            }
        ]
    }

    /*  private dataManger = new DataManager({
          url: "http://localhost:54738/Home/LoadData", // Here need to mention the web api sample running path
          crudUrl: "http://localhost:54738/Home/UpdateData",
          crossDomain: true,
          adaptor: new UrlAdaptor()
      });*/

    private dataManger = new DataManager({
        url: "http://localhost:8081/api/meetings",
        crossDomain: true,
        adaptor: new WebApiAdaptor()
    });

    /*  private dataManger = new DataManager({
          url: "https://ej2services.syncfusion.com/production/web-services/api/Schedule",
          crossDomain: true,
          adaptor: new WebApiAdaptor()
      });*/


    // private data = new DataManager({ url: 'http://localhost:5000/GetData', crudUrl: 'http://localhost:5000/BatchData', adaptor: new UrlAdaptor, crossDomain: true });

    private onDragStart(args: DragEventArgs): void {
        //Exclude
        args.excludeSelectors = 'e-all-day-cells';
        //Allow the Scheduler to navigate from current date range to back and forth respectively
        (args.navigation as NavigateOptions).enable = true;
    }

    private onResizeStart(args: ResizeEventArgs): void {
        (args.scroll as ScrollOptions).scrollBy = 500;
    }

    private onDragStop(args: DragEventArgs): void {
        args.cancel = this.onEventCheck(args);
    }

    private onResizeStop(args: ResizeEventArgs): void {
        args.cancel = this.onEventCheck(args);
    }

    /**
     * Disables the editor popup for scheduled meetings
     * Prevents displaying the popups on past dates
     * @param args
     * @private
     */
    private onPopupOpen(args: PopupOpenEventArgs) {
        if (args.target && args.target.classList.contains('e-appointment') && args.type === 'Editor') {
            args.cancel = true;
        }
        if (args.target && !args.target.classList.contains('e-appointment') && ['QuickInfo', 'Editor'].indexOf(args.type) > -1) {
            args.cancel = this.onEventCheck(args);
        }
    }

    private onEventCheck(args: any): boolean {
        let eventObj: any = args.data instanceof Array ? args.data[0] : args.data;
        console.log("onEventCheck")
        console.log(eventObj.StartTime)
        return (eventObj.StartTime < new Date());
    }

    /**
     * Adds the custom click event on scheduled meetings
     * @param args
     * @private
     */
    private onEventRendered(args: EventRenderedArgs) {
        console.log("onEventRendered")
        console.log(args.data.EndTime + "  <<<<   " + new Date())
        if (args.data.EndTime < new Date()) {
            args.element.classList.add('e-past-app');
        }
        args.element.addEventListener('click', this.customClick);
    }

    /**
     * Handles the double click on scheduled meetings
     * @param args
     */
    private customClick(args: any) {
        console.log("customClick");
        console.log(args.data);
        // if double click
        if (args.detail === 2) {
            const url = 'https://google.com/';
            window.open(url, '_blank');
        }
    }

    private onRenderCell(args: RenderCellEventArgs): void {
        if (args.date && args.date < new Date()) {
            args.element.setAttribute('aria-readonly', 'true');
            args.element.classList.add('e-read-only-cells');
        }
    }

    /**
     * Returns a custom template for the editor popup
     * @param props
     * @private
     */
    private editorTemplate(props: any): JSX.Element {
        return (props !== undefined ? <table className="custom-event-editor" style={{width: '100%'}}>
            <tbody>
            <tr>
                <td className="e-textlabel">Subject</td>
                <td colSpan={4}>
                    <input id="Subject" className="e-field e-input" type="text" name="Subject" style={{width: '100%'}}/>
                </td>
            </tr>
            <tr>
                <td className="e-textlabel">From</td>
                <td colSpan={4}>
                    <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" data-name="StartTime"
                                             value={new Date(props.startTime || props.StartTime)}
                                             className="e-field"></DateTimePickerComponent>
                </td>
            </tr>
            <tr>
                <td className="e-textlabel">To</td>
                <td colSpan={4}>
                    <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" data-name="EndTime"
                                             value={new Date(props.endTime || props.EndTime)}
                                             className="e-field"></DateTimePickerComponent>
                </td>
            </tr>
            </tbody>
        </table> : <div></div>);
    }

    public render() {
        return <ScheduleComponent eventSettings={{dataSource: this.dataManger}}
                                  dragStart={this.onDragStart.bind(this)}
                                  dragStop={this.onDragStop.bind(this)}
                                  resizeStart={this.onResizeStart.bind(this)}
                                  resizeStop={this.onResizeStop.bind(this)}
                                  enablePersistence={true}
                                  popupOpen={this.onPopupOpen.bind(this)}
                                  editorTemplate={this.editorTemplate.bind(this)}
                                  eventRendered={this.onEventRendered.bind(this)}
                                  renderCell={this.onRenderCell.bind(this)}>
            <ViewsDirective>
                <ViewDirective option="Day"/>
                <ViewDirective option="Week"/>
                <ViewDirective option="WorkWeek"/>
                <ViewDirective option="Month"/>
                <ViewDirective option="Agenda"/>
                <ViewDirective option="MonthAgenda"/>
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, DragAndDrop, Resize]}/>
        </ScheduleComponent>
    }
}

export default App;
