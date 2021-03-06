import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-add-tastes',
  templateUrl: './customer-add-tastes.component.html',
  styleUrls: ['./customer-add-tastes.component.css']
})
export class CustomerAddTastesComponent implements OnInit {
  customer: Customer | undefined;
  tasteForm: FormGroup;
  title = "ADD TASTE";
  nameTaste: string | null;
  _id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _customerService: CustomerService,
              private aRouter: ActivatedRoute) { 
    this.tasteForm = this.fb.group({
      _id: [''],
      customerName: [''],
      fullName: [''],
      email: [''],
      listTastes: this.fb.group({
        tagName: ['', Validators.required],
        relevance: ['', Validators.required]
      }),
      listDiscounts: [],
      listReservations: [],
      password: [''],
      creationDate: ['']
    });


    this._id = this.aRouter.snapshot.paramMap.get('_id');
    console.log(this._id);
    this.nameTaste = this.aRouter.snapshot.paramMap.get('nameTaste');
    console.log(this.nameTaste);
  }

  ngOnInit(): void {
    this.getCustomerInfo();
  }

  addTaste() {
    const customer: Customer = {
      _id: this.tasteForm.get('_id')?.value,
      customerName: this.tasteForm.get('customerName')?.value,
      fullName: this.tasteForm.get('fullName')?.value,
      email: this.tasteForm.get('email')?.value,
      listDiscounts: this.tasteForm.get('listDiscounts')?.value,
      listTastes: [{
        tagName: this.tasteForm.value.listTastes.tagName,
        relevance: this.tasteForm.value.listTastes.relevance,
      }],
      listReservations: this.tasteForm.get('listReservations')?.value,
      password: this.tasteForm.get('password')?.value,
      creationDate: this.tasteForm.get('creationDate')?.value,
    }
    
    if (this._id !== null) {
        this.addTastesToCustomer(customer);
        this._customerService.updateCustomer(this._id, customer).subscribe(data => {
          this.router.navigate(['/list-customers/', this._id])
        }, error => {
          console.log(error);
          this.tasteForm.reset();
        })
      }
    }

  getCustomerInfo() {
    if(this._id !== null) {
      if(this.nameTaste !== null) {
        this.title = "EDIT TASTE"
        this._customerService.getCustomerbyID(this._id).subscribe(data => {
          this.delTastesFromCustomer(data);
          this.tasteForm.setValue({
            _id: data._id,
            customerName: data.customerName,
            fullName: data.fullName,
            email: data.email,
            listTastes: {
              tagName: data.listTastes[0].tagName,
              relevance: data.listTastes[0].relevance,
            },
            listDiscounts: data.listDiscounts,
            listReservations: data.listReservations,
            password: data.password,
            creationDate: data.creationDate,
          })
        })
      }
      else {
        this.title = "add TASTE"
        this._customerService.getCustomerbyID(this._id).subscribe(data => {
          this.delTastesFromCustomer(data);
          this.tasteForm.setValue({
            _id: data._id,
            customerName: data.customerName,
            fullName: data.fullName,
            email: data.email,
            listTastes: {
              tagName: '',
              relevance: '',
            },
            listDiscounts: data.listDiscounts,
            listReservations: data.listReservations,
            password: data.password,
            creationDate: data.creationDate,
          })
        })
      }
    }
  }

  addTastesToCustomer(cust: Customer) {
    if (this.customer !== undefined) {
      for (var i = this.customer?.listTastes.length - 1; i >= 0; i -= 1) {
        if (this.customer?.listTastes[i].tagName !== this.nameTaste
      ) {
          cust.listTastes.push(this.customer.listTastes[i]);
        }
      }
    }
  }

  delTastesFromCustomer(cust: Customer) {
    if (this._id !== null) {
      for (var i = cust.listTastes.length - 1; i >= 0; i -= 1) {
        if (cust.listTastes[i].tagName !== this.nameTaste) {
          cust.listTastes.splice(i, 1);
        }
      }

      this._customerService.getCustomerbyID(this._id).subscribe(data => {
        this.customer = data;
      })
    }
  }

  deleteTaste() {
    if(confirm("Are you sure to delete the taste?")) {
      if (this.nameTaste !== null && this.customer !== undefined && this._id !== null) {
        for (var i = this.customer.listTastes.length - 1; i >= 0; i -= 1) {
          if (this.customer.listTastes[i].tagName == this.nameTaste) {
            this.customer.listTastes.splice(i, 1);
          }
        }
        
        this._customerService.updateCustomer(this._id, this.customer).subscribe(data => {
          console.log("Taste deleted");
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
