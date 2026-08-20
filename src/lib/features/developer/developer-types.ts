export type DevStatus="Backlog"|"To Do"|"In Progress"|"In Review"|"Done"|"Rejected";
export type DevPriority="Low"|"Medium"|"High"|"Urgent"|"Critical";
export interface DevUser{_id?:string;id?:string;email?:string;role?:string}
export interface DevProject{_id:string;id?:string;key:string;name:string;description?:string;lead:string|DevUser;members:(string|DevUser)[];status?:string;createdAt:string;updatedAt:string}
export interface DevSprint{_id:string;projectId:string;name:string;goal?:string;status:"planned"|"active"|"completed";startDate?:string;endDate?:string;createdAt:string}
export interface DevAttachment{url?:string;storageKey:string;originalName:string;mimeType:string;size:number}
export interface DevTask{_id:string;id?:string;projectId:string;key:string;sequence:number;type:"Epic"|"Story"|"Task"|"Bug"|"Subtask";title:string;description?:string;status:DevStatus;priority:DevPriority;assignee?:string|DevUser;reporter:string|DevUser;sprintId?:string;storyPoints:number;percentComplete:number;rewardPoints:number;earnedPoints:number;dueDate?:string;labels?:string[];attachments?:DevAttachment[];resolution?:string;createdAt:string;updatedAt:string}
export interface DevMessage{_id:string;projectId:string;taskId?:string;senderId:string|DevUser;text?:string;attachments?:DevAttachment[];createdAt:string}
export interface LeaderboardRow{userId:string;email?:string;role?:string;points:number;completed:number;avgStoryPoints:number;lastAcceptedAt?:string}
export interface DevReport{total:number;done:number;completionRate:number;totalPoints:number;byStatus:Array<{_id:string;count:number}>;byPriority:Array<{_id:string;count:number}>;byAssignee:Array<{userId:string;email?:string;count:number;done:number;points:number;averageCompletion:number}>}
