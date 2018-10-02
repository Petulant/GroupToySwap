

export class Flag{

    bidId: String;
    reportDate: number;
    status: String;
    issue: String;
    adminComment: String;

    constructor(){

        this.bidId = "not specified";
        this.reportDate = Date.now();
        this.status = "not specified";
        this.issue = "not specified";
        this.adminComment = "not specified"
    }

    setBidId(bidId: String){
        this.bidId = bidId;
    }
    getBidId(){
        return this.bidId;
    }
    setReportDate(date: number){
        this.reportDate = date;
    }
    getReportDate(){
        return this.reportDate;
    }
    setStatus(status: String){
        this.status = status;
    }
    getStatus(){
        return this.status;
    }
    setIssue(issue: String){
        this.issue = issue;
    }
    getIssue(){
        return this.issue;
    }
    setAdminComment(comment: String){
        this.adminComment = comment;
    }
    getAdminComment(){
        return this.adminComment;
    }
}