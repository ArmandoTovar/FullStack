
export interface diagnose {
    "code": string,
    "name": string,
    "latin"?: string
    }
export enum Type {
        Hospital='Hospital',
        HealthCheck='HealthCheck',
        OccupationalHealthcare='OccupationalHealthcare',
    }
interface BaseEntry {
        id: string;
        description: string;
        date: string;
        specialist: string;
        diagnosisCodes?: Array<diagnose['code']>;
      } 


export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge:{
        date: string,
    criteria: string
    };
  }

  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave:{startDate:string,endDate:string};
  }
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender {
    Male = 'male',Female='female'
}

export interface diagnose {
"code": string,
"name": string,
"latin"?: string
}

export interface patient
{
    "id": string,
    "name": string,
    "dateOfBirth": string,
    "ssn": string,
    "gender": Gender,
    "occupation": string,
    "entries": Entry[]
}
export type newPatient = Omit<patient,'id'>;

export type PublicPatient  = Omit<patient,'ssn'| 'entries'>;
