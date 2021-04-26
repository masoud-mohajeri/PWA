import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbQuery } from 'src/app/shared/models/dbQuery.model';
import { DbResponse } from 'src/app/shared/models/dbResponse.model';
import { DbHelperService } from 'src/app/shared/services/dbWorkerHelper.service';
import { dbEnvValidator } from './validator.utility';

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
    this.dbForm = new FormGroup(
      {
        dbType: new FormControl('ls', Validators.required),
        numberOfQuerys: new FormControl('1000', Validators.required),
        environment: new FormControl('normal', Validators.required),
      },
      { validators: dbEnvValidator }
    );
  }

  onClear(): void {
    this.dbHelper.clearAll();
  }

  onSubmit(): void {
    this.inserting = true;
    const transaction: DbQuery = {
      db: this.dbForm.value.dbType,
      numberOfQuerys: +this.dbForm.value.numberOfQuerys,
    };
    if (this.dbForm.value.environment === 'normal') {
      this.transactionInDbHelper(transaction);
    } else if (this.dbForm.value.environment === 'webWorker') {
      this.transactionInWorker(transaction);
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
        // console.log(this.responses);
        setTimeout(() => {
          this.inserting = false;
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        this.inserting = false;
      });
  }

  transactionInWorker(transaction: DbQuery): void {
    this.dbHelper.callWorkertoWrite(transaction).then((ltc: number) => {
      this.inserting = false;
      this.responses.push({
        dbType: this.dbForm.value.dbType,
        latency: ltc,
        numberOfQuerys: +this.dbForm.value.numberOfQuerys,
        environment: 'webWorker',
      });
      // console.log(this.responses);
    });
  }
}
