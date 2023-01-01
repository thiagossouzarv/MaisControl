import * as Print from 'expo-print';
import Moment from './date';

interface Agroupment {
    key: string;
    title: string;
    items: any[],
}

interface ReportGroupItem {
    key: string;
    title: string;
}

type ReportGroupType = "default" | "highlight";

export interface ReportGroup {
    keyExtractor: (item: any) => string;
    agroupments: ReportGroupItem[];
    type: ReportGroupType;
};

interface ColumnTotalizer {
    totalizer?: ReportColumnTotalizer;
    sum: 0;
    counter: 0;
};

interface ReportColumnTotalizer {
    extractor: (item: any) => number;
    counterExtractor: (item: any) => number;
    operation: (total: number, counter: number) => string;
};

interface ReportColumn {
    name: string;
    render: (item: any) => string;
    align?: "left" | "center" | "right";
    totalizer?: ReportColumnTotalizer;
};

interface SummaryReportTotalizer {
    name: string;
    mainExtractor: (item: any) => number;
    detailExtractor: (item: any) => number;
    mainTransform: (total: number) => string;
    detailTransform: (total: number, mainTotal: number) => string;
};

interface SummaryReport {
    title: string;
    totalizers: SummaryReportTotalizer[];
};

interface SummaryTotalizer {
    main: number;
    detail: number;
    config: SummaryReportTotalizer;
};

interface Summary {
    title: string;
    totalizers: SummaryTotalizer[]
};

interface ReportConfig {
    title: string;
    subtitle: string;
    groups?: ReportGroup[];
    columns: ReportColumn[];
    rowStyleClass?: (item: any) => "error" | "success" | "warn" | "info" | "none";
    summary?: SummaryReport;
};

export default class ReportUtils {
    static printAsync(data: any[], config: ReportConfig): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const report = this.create(data, config);
                await Print.printAsync({
                    html: report
                });

                resolve();

            } catch (error: any) {
                reject({ userMessage: error.userMessage || "Falha ao gerar relatório." });
            }
        });
    };

    private static create(data: any[], config: ReportConfig): string {
        const tbody = this.getBody(data, config);

        const html = `
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                <style>
                    @media print {
                        body {
                            -webkit-print-color-adjust: exact !important;
                            color-adjust: exact !important;
                        }
                
                        @page {
                            margin: 0;
                            margin-top: 1cm;
                            margin-bottom: 1cm;
                            margin-left: 1cm;
                            margin-right: 1cm;
                        }
                
                        @page {
                            size: portrait;
                        }
                
                        tbody {
                            page-break-inside: avoid;
                            break-inside: avoid;
                        }   
                    }
                </style>
                
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap');
                
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Roboto;
                    }
                
                    .highlight {
                        color: #1da1f2 !important;
                    }
                
                    .bold {
                        font-weight: bold !important;
                    }
                
                    table {
                        color: #1e293b;
                        border-collapse: collapse;
                        font-size: 11px;
                        max-width: 100vw;
                        min-width: 100vw;
                    }
                
                    tr.spacing {
                        height: 10px;
                    }
                
                    tr.error {
                        background-color: #fff6f6;
                        color: #9f3a38;
                    }
                
                    tr.success {
                        background-color: #f2f7f3;
                        color: #499451;
                    }
                
                    tr.warn {
                        background-color: #fffaf3;
                        color: #573a08;
                    }
                
                    tr.info {
                        background-color: #f8ffff;
                        color: #276f86;
                    }
                
                    /** Header
                    ****************************************/
                
                    thead.report-header {
                        background-color: #FFF;
                        color: #1e293b;
                        display: table-header-group;
                        text-align: left;
                    }
                
                    thead th {
                        font-weight: normal;
                        border-bottom: 3px solid #1e293b;
                    }
                
                    thead .spacing {
                        height: 20px;
                    }
                
                    thead .header-info {
                        display: flex;
                        justify-content: space-between;
                    }
                
                    thead.report-header .report-header-cell {
                        padding: 10px 15px;
                    }
                
                    thead .logo {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                    }
                
                    thead .svg-logo {
                        height: 25px;
                        width: 25px;
                        margin-right: 7px;
                    }
                
                    thead .company {
                        font-size: 20px;
                    }
                
                    thead .area {
                        padding: 5px 0px;
                    }
                
                    thead .area.main .title {
                        font-weight: bold;
                        font-size: 22px;
                    }
                
                    thead .area.main .subtitle {
                        font-weight: 100;
                        font-size: 14px;
                    }
                
                    thead .area.detail {
                        margin-left: auto;
                        display: flex;
                        align-items: flex-end;
                        font-size: 12px;
                        text-align: right;
                    }
                
                    table.report-container {
                        page-break-after: always;
                    }

                    table td.align-center,
                    table th.align-center {
                        text-align: center;
                    }

                    table td.align-right,
                    table th.align-right {
                        text-align: right;
                    }
                
                    table .report-group,
                    table .report-content-header {
                        page-break-after: avoid !important;
                    }

                    table .report-group.highlight td {
                        
                    }
                
                    table .report-group td {
                        color: #1e293b;
                        font-size: 17px;
                        font-weight: bold;
                        font-style: italic;
                        padding: 15px;
                    }

                    table .report-group:not(.default) td {
                        font-size: 19px;
                        font-style: normal;
                        padding: 8px 15px;
                    }

                    table .group-separator {
                        height: 7px;
                    }

                    table .group-separator.double {
                        height: 14px;
                    }
                
                    table .report-content-header {
                        color: #1e293b;
                        font-weight: bold;
                        text-align: left;
                    }
                
                    table .report-content-header th {
                        border-bottom: 2px solid #1e293b;
                        padding: 5px 15px 5px 15px;
                    }
                
                    table .report-content-data td,
                    table .report-content-subtotal td {
                        padding: 5px 15px 5px 15px;
                    }
                
                    table .report-content-subtotal {
                        background-color: #d7dbe0;
                        font-weight: bold;
                    }
                
                    /** Sumario Final
                    ********************************************/
                
                    .report-summary td {
                        padding: 0 !important;
                    }
                
                    .report-summary .content {
                        background-color: #DDD;
                        border-radius: 7px;
                        margin-top: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                
                    .report-summary .header {
                        margin: 0px;
                        padding: 10px 30px;
                    }
                
                    .report-summary .header .title {
                        font-size: 22px;
                        font-weight: bold;
                        color: #1e293b;
                    }
                
                    .report-summary .main {
                        flex-grow: 1;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        padding: 15px 30px;
                        margin: 5px 0px;
                    }
                
                    .report-summary .main .info {
                        text-align: center;
                        margin 0 5px;
                    }
                
                    .report-summary .main .info .title {
                        margin-bottom: 5px;
                        font-size: 14px;
                    }
                
                    .report-summary .main .info .values {
                        text-align: center;
                    }
                
                    .report-summary .main .info .value {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 16px;
                    }
                
                    .report-summary .main .info .detail {
                        opacity: 0.8;
                        font-size: 13px;
                    }
                
                    /** Footer
                    ********************************************/
                
                    #footer {
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                        font-size: 14px;
                        font-weight: normal;
                    }
                
                    tfoot.report-footer th {
                        padding: 0 !important;
                        padding-top: 20px !important;
                    }
                
                    .report-footer {
                        color: #1e293b;
                        /*background-color: #c2c7cf;*/
                        padding: 10px 30px;
                        text-align: right;
                    }
                
                    .text-success {
                        color: #40a847;
                    }
                
                    .text-error {
                        color: #e2514e;
                    }
                </style>
            </head>
            <body style="text-align: center;">           
        
                <table class="report-container">
                    <thead class="report-header">
                        <tr>
                            <th class="report-header-cell" colspan="${config.columns.length}">
                                <div class="header-info">
                                    <div class="area main">
                                        <div class="title">${config.title}</div>
                                        <div class="subtitle">${config.subtitle}</div>
                                    </div>
                                    <div class="logo">
                                        <svg class="svg-logo" version="1.1" viewBox="0 20 200 200" xmlns="http://www.w3.org/2000/svg">
                                            <path transform="scale(.26458)"
                                                d="m387.12 185.54c-24.775 3.59-34.233 35.614-28.702 56.539 12.731 18.868 37.904 17.027 57.461 22.541-1.3554 60.465 0.42391 121.67-2.8622 181.68-16.378 43.376-54.352 80.51-102.18 84.335-65.333 8.0938-131.22-48.022-128.73-114.84-0.89161-48.514-3.5462-97.449 0.65181-145.78 5.2932-15.471 27.464-6.1862 38.763-14.256 28.792-10.158 21.73-54.859-0.92229-67.686-23.576-4.4923-47.788 6.1577-71.305 9.143-17.159 3.1537-45.153 9.0526-39.997 32.271 1.1408 73.997-2.5559 148.23 2.6878 222.07 15.318 71.442 73.128 131.46 144.19 149.03 11.955 5.0193 4.6429 25.23 10.255 36.275 20.93 97.741 121.69 169.37 220.83 158.53 102.36-2.594 197.9-94.323 193.74-198.78 1.1163-45.449 1.5116-90.913 2.2745-136.37 26.784-17.79 42.134-50.729 33.925-82.506-7.8824-49.915-72.711-73.341-112.87-45.213-37.761 23.976-45.121 82.403-12.649 113.79 11.844 8.4417 22.884 16.073 17.864 32.644-1.4623 49.932 3.942 100.82-5.5163 150.1-17.171 63.309-86.233 102.26-149.66 92.82-61.233-3.6163-116.75-58.074-118.58-119.23 41.909-13.068 82.758-33.745 109.46-69.837 31.303-35.004 45.75-81.883 43.915-128.41-0.16579-61.651 3.0442-123.65-2.0817-185.09-7.0425-23.145-37.268-19.607-55.85-26.192-14.641-2.6596-29.162-7.1963-44.105-7.5691zm259.98 189.58c22.406-0.88288 25.603 31.824 6.2768 39.232-21.984 10.68-39.408-24.769-19.568-36.713 4.0269-2.216 8.7664-2.745 13.292-2.5192z"
                                                stroke-width="10" style="paint-order:stroke markers fill; fill: #1e293b; stroke: #1e293b;" />
                                        </svg>
                                        <div class="company">
                                            dr. <span class="highlight">task</span>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr class="spacing"></tr>
                    </thead>
                
                    ${tbody}
                
                    <tfoot class="report-footer" style="opacity: 0;">
                        <tr class="spacing"></tr>
                        <tr>
                            <th class="report-footer-cell" colspan="${config.columns.length}">
                                <div class="content">
                                <div class="info">impresso em <span class="bold">${Moment.formatDate(new Date())}</span> às <span class="bold">${Moment.formatHoursAndMinutes(new Date())}</span></div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>
                
                <div id="footer" class="report-footer">
                    <div class="content">
                        <div class="info">impresso em <span class="bold">${Moment.formatDate(new Date())}</span> às <span class="bold">${Moment.formatHoursAndMinutes(new Date())}</span></div>
                        <div class="page-number"></div>
                    </div>
                </div>
            </body>
        </html>
        `;

        return html;
    }

    static getBody(data: any[], config: ReportConfig) {
        let html = "";
        const hasGroups = !!config.groups?.length;        

        if (!hasGroups) {
            const header = `
                ${this.getTBodyOpenTag(true)}
                ${this.getHeaderColumns(config)}
            `;

            const trs = this.getTrItems(data, config);
            html = header + trs + "</tbody>";

        } else if (config.groups) {
            html = this.groupingData(data, config.groups, config);
        }
        
        const summary = this.getSummary(data, config);            
        return html + summary;
    }

    static getSummary(data: any[], config: ReportConfig): string {
        if (!config.summary || !data.length) return "";

        const summary: Summary = {
            title: config.summary.title,
            totalizers: config.summary.totalizers.map(config => ({
                config,
                detail: 0,
                main: 0
            }))
        }; 

        data.forEach(row => {
            for (let counter of summary.totalizers) {
                counter.detail += counter.config.detailExtractor(row);
                counter.main += counter.config.mainExtractor(row);
            }
        });

        return `
        <tr class="report-summary">
            <td colspan="${config.columns.length}">
                <div class="content">
                    <div class="header">
                        <div class="title">${summary.title}</div>
                    </div>
                    <div class="main">
                        ${summary.totalizers.map(total => `
                        <div class="info">
                            <div class="title">${total.config.name}</div>
                            <div class="values">
                                <div class="value">${total.config.mainTransform(total.main)}</div>
                                <div class="detail">${total.config.detailTransform(total.detail, total.main)}</div>
                            </div>
                        </div>
                        `).join("")}
                    </div>
                </div>
            </td>
        </tr>        
        `;
    }

    static groupingData(data: any[], groups: ReportGroup[], config: ReportConfig): string {

        if (!groups.length) return "";

        let html = "";
        const [group, ...innerGroups] = groups;
        const agroupments: Agroupment[] = group.agroupments.map(g => ({
            key: g.key,
            title: g.title,
            items: []
        }));

        for (let item of data) {
            const keyItem = group.keyExtractor(item);
            const groupItem = agroupments.find(o => o.key === keyItem);

            if (groupItem) groupItem.items.push(item);
        }

        html += agroupments.map(g => {
            return `
                <tr class="group-separator ${group.type}" />
                <tr class="report-group ${group.type}">
                    <td class="report-content-cell" colspan="${config.columns.length}">
                        ${g.title}
                    </td>
                </tr>
                ${group.type !== "default" && config.groups?.length === 1 ? `<tr class="group-separator ${group.type} double" />` : ""}
                ${innerGroups?.length ? this.groupingData(g.items, innerGroups, config) : this.getHeaderColumns(config) + this.getTrItems(g.items, config)}
                <tr class="group-separator ${group.type} ${group.type !== "default" && config.groups?.length === 1 ? "double" : ""}" />
            `;
        }).join("");

        return html;
    }

    static getTBodyOpenTag(first = false) {
        return `<tbody class="report-content ${first ? 'first-child' : ''}">`;
    }

    static getHeaderColumns(config: ReportConfig) {
        const columns = config.columns.map(col => {
            return `<th class="align-${col.align || 'left'}">${col.name}</th>`;
        }).join("");

        return `<tr class="report-content-header">${columns}</tr>`;
    }

    static getTrItems(data: any[], config: ReportConfig): string {
        const totals: ColumnTotalizer[] = config.columns.map(col => ({
            totalizer: col.totalizer,
            sum: 0,
            counter: 0,
        }));

        const trs = data.map(row => {
            totals.forEach(sub => {
                if (!sub.totalizer) return sub;

                sub.sum += sub.totalizer.extractor(row);
                sub.counter += sub.totalizer.counterExtractor(row);
            });

            const rowStyle = config.rowStyleClass ? config.rowStyleClass(row) : "";
            const tds = config.columns.map(col => `<td class="align-${col.align || 'left'}">${col.render(row)}</td>`).join("");
            return `<tr class="report-content-data  ${rowStyle}">${tds}</tr>`;
        }).join("");

        const subtotals = totals.some((sub) => !!sub.totalizer) ? 
            `
                <tr class="report-content-subtotal">
                    ${totals.map((sub, index) => !!sub.totalizer ? 
                        `<td class="align-${config.columns[index].align || 'left'}">${sub.totalizer.operation(sub.sum, sub.counter)}</td>` :
                        "<td></td>"
                    ).join("")}
                </tr>
            ` : "";

        return trs + subtotals;
    }
}