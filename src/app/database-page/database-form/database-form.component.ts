import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DbQuery } from 'src/app/shared/models/dbQuery.model';
import { DbResponse } from 'src/app/shared/models/dbResponse.model';
import { DbHelperService } from 'src/app/shared/services/dbWorkerHelper.service';

@Component({
  selector: 'app-database-form',
  templateUrl: './database-form.component.html',
  styleUrls: ['./database-form.component.scss'],
})
export class DatabaseFormComponent implements OnInit {
  dbForm!: FormGroup;
  responses: DbResponse[] = [];
  inserting = false;
  constructor(private dbHelper: DbHelperService) {}

  ngOnInit(): void {
    this.dbForm = new FormGroup({
      dbType: new FormControl('ls', Validators.required),
      numberOfQuerys: new FormControl('1000', Validators.required),
      environment: new FormControl('normal', Validators.required),
    });
  }

  // checkdb(group: FormGroup) {
  //   const db = group.controls.dbType.value;
  //   const env = group.controls.environment.value;
  //   return db === 'ls' && env === 'webWorker' ? { dbaval: true } : null;
  // }

  onClear() {
    this.dbHelper.clearAll();
  }
  onSubmit() {
    this.inserting = true;
    const transaction: DbQuery = {
      db: this.dbForm.value.dbType,
      numberOfQuerys: +this.dbForm.value.numberOfQuerys,
    };
    if (this.dbForm.value.environment === 'normal') {
      this.transactionInDbHelper(transaction);
    } else if (this.dbForm.value.environment === 'webWorker') {
      this.dbHelper.callWorkertoWrite(transaction).then((ltc: number) => {
        this.inserting = false;
        this.responses.push({
          dbType: this.dbForm.value.dbType,
          latency: ltc,
          numberOfQuerys: +this.dbForm.value.numberOfQuerys,
          environment: 'webWorker',
        });
        console.log(this.responses);
      });
    }
  }

  transactionInDbHelper(transaction: DbQuery): void {
    this.dbHelper
      .transaction(transaction)
      ?.then((ltc) => {
        this.responses.push({
          dbType: this.dbForm.value.dbType,
          latency: ltc,
          numberOfQuerys: +this.dbForm.value.numberOfQuerys,
          environment: 'normal',
        });
        console.log(this.responses);
        setTimeout(() => {
          this.inserting = false;
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        this.inserting = false;
      });
  }
}
