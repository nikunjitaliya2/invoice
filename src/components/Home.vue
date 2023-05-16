<script setup>
import { reactive, ref } from 'vue'
import Invoice from './invoice.vue'

const discount = ref(0)
const GstPlus = ref(0)
const totalQuality = ref(0)
const totalRate = ref(0)
const count = ref(0)
const RoundOff= ref(0)
const TotalAmount = ref(0)
const IsRoundOff = ref(true)
const InvoiceDetailsAdd  = ref([])

const InvoiceDetails = reactive({
  InvoiceNumber: 0,
  referenceNumber: 0,
  Date: '',
  AccountName: '',
  SalesLedger: ''
})

const discountTotal = async (Quality, Rate, DiscountTotal, gst) => {
  // total discount and Item rate
  discount.value = (Rate * Quality) - ((DiscountTotal / 100) * (Quality * Rate))

  // console.log('discount.value',discount.value);
  GstPlus.value = (gst / 100) * (discount.value)

  TotalAmount.value = discount.value + GstPlus.value

}

const printInvoice = () => {
  InvoiceDetailsAdd.value = [InvoiceDetails,applicants,total]
  console.log('InvoiceDetailsAdd.value',InvoiceDetailsAdd.value);
}

const total = reactive({
  TotalAmount: RoundOff,
  totalQuality: totalQuality
})


const SaveProductDetails = async (id) => {
  // await discountTotal(ItemList.Qlt, ItemList.Rate, ItemList.Discount, ItemList.Gst)
  await discountTotal(applicants[id].Qlt, applicants[id].Rate, applicants[id].Discount, applicants[id].Gst)

  applicants[id].Amount = TotalAmount.value

  // total of quality
  totalQuality.value = applicants.reduce((acc, obj) => acc + obj.Qlt, 0)
  totalRate.value = applicants.reduce((acc, obj) => acc + obj.Amount, 0)
  RoundOff.value = Math.round(totalRate.value)
}


const applicants = reactive([
  {
    id: 0,
    itemName: '',
    Qlt: '',
    Uom: '',
    Rate: '',
    Gst: '',
    Discount: '',
    Amount: '',
    Delete: '',
    Edit: ''
  },
  {
    id: ++count.value,
    itemName: '',
    Qlt: '',
    Uom: '',
    Rate: '',
    Gst: '',
    Discount: '',
    Amount: '',
    Delete: '',
    Edit: ''
  },
  {
    id: ++count.value,
    itemName: '',
    Qlt: '',
    Uom: '',
    Rate: '',
    Gst: '',
    Discount: '',
    Amount: '',
    Add : '',
  }
])

const AddField = async () => {
  applicants.unshift({
    id: ++count.value,
    itemName: '',
    Qlt: '',
    Uom: '',
    Rate: '',
    Gst: '',
    Discount: '',
    Amount: '',
    Delete: '',
    Edit: ''
  })

}

const deleteField = async (id) => {
  await applicants.map((item, index) => {
    if (item.id === id && applicants.length > 3) {
      applicants.splice(index, 1)
    }
  })
}



</script>

<template>
  <div class='container-fluid py-4 bg-color'>
    <div class='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
      <div class='col col-12'>
        <FormKit
          label='Invoice No'
          class='form-control'
          name='Invoice'
          placeholder='001'
          type='number'
          v-model='InvoiceDetails.InvoiceNumber'
          validation='required|character'
        />
      </div>
      <div class='col col-12'>
        <FormKit
          label='Reference No.'
          class='form-control'
          v-model='InvoiceDetails.referenceNumber'
          name='Reference No'
          type='number'
          validation='required|character'
        />
      </div>
      <div class='col col-12'>
        <FormKit
          label='Date'
          type='date'
          name='date'
          v-model='InvoiceDetails.Date'
          value='2023-01-01'
          validation='required|after:2010-01-01'
          validation-visibility='live'
        />
      </div>
    </div>
    <div class='row row-cols-lg-2 row-cols-md-2 row-cols-sm-1'>
      <div class='col col-12'>
        <FormKit
          label='Party A/c Name'
          class='form-control'
          placeholder='John Doe'
          name='account Name'
          v-model='InvoiceDetails.AccountName'
          type='text'
          validation='required|character'
        />
      </div>
      <div class='col col-12'>
        <FormKit
          type='select'
          label='Sales Ledger'
          v-model='InvoiceDetails.SalesLedger'
          name='sales'
          :options="[
              'Default',
              'Amazon Sale',
              'Flipkart',
              'Alibaba',
          ]"
        />
      </div>
    </div>
    <div class='row row-cols-lg-2 row-cols-md-2 row-cols-sm-1'>
      <div class='col col-12'>
        <p class='m-0'>Address : Surat, Gujarat,</p>
<!--        <p class='m-0'></P>-->
        <p>phone No. : 95687-69846 , Email id : abc@gmail.com</p>
      </div>
      <div class='col col-12'>
        <p class='m-0'>Sale Account</p>
      </div>
    </div>
    <!--    item list-->
    <h4 class='py-2 text-black fs-4'>Item List</h4>
    <div class='row '>
      <div class='col-4 d-none d-lg-block'><span>Name of item</span></div>
      <div class='col-1 d-none d-lg-block'><span>Qty</span></div>
      <div class='col-1 d-none d-lg-block'><span>UOM</span></div>
      <div class='col-1 d-none d-lg-block'><span>Rate Per</span></div>
      <div class='col-1 d-none d-lg-block'><span>GST Rate</span></div>
      <div class='col-1 d-none d-lg-block'><span>Discount</span></div>
      <div class='col-1 d-none d-lg-block'><span>Amount</span></div>
    </div>
    <div v-for='applicant in applicants' :key='applicant.id'>
      <form @submit.prevent='SaveProductDetails(applicant.id)' v-on:input='SaveProductDetails(applicant.id)'>
        <div class='row row-cols-2 g-lg-2 py-2'>
          <div class='col-md-6 col-lg-4 col-12'>
            <label for='NameItem' class='form-label d-block d-sm-block d-md-block d-lg-none'>Name of item</label>
            <input type='text' class='form-control' id='NameItem' v-model='applicant.itemName'
                   placeholder='lorem ipsums'>

          </div>
          <div class='col-md-6 col-lg-1 col-12'>
            <label for='quality' class='form-label d-block d-sm-block d-md-block d-lg-none'>Qlt</label>
            <input type='number' class='form-control' id='quality' v-model='applicant.Qlt' placeholder='10'>

          </div>
          <div class='col-md-4 col-lg-1 col-12'>
            <label for='uom' class='form-labd-sm-block d-md-block d-lg-none'>UOM</label>
            <input type='number' class='form-control' id='uom' v-model='applicant.Uom' placeholder='MRTS'>

          </div>
          <div class='col-md-4 col-lg-1 col-12'>
            <label for='ratePer' class='form-label d-block d-sm-block d-md-block d-lg-none'>Rate per</label>
            <input type='number' class='form-control' id='ratePer' v-model='applicant.Rate' placeholder='$30'>

          </div>
          <div class='col-md-4 col-lg-1 col-12'>
            <label for='gstRate' class='form-label d-block d-sm-block d-md-block d-lg-none'>GST Rate</label>
            <input type='number' class='form-control' v-model='applicant.Gst' id='gstRate' placeholder='10'>
   
          </div>
          <div class='col-md-4 col-lg-1 col-12'>
            <label for='discount' class='form-label d-block d-sm-block d-md-block d-lg-none'>Discount</label>
            <input type='number' class='form-control' id='discount' v-model='applicant.Discount' placeholder='10'>

          </div>
          <div class='col-md-4 col-lg-2 col-12'>
            <label for='Amount' class='form-label d-block d-sm-block d-md-block d-lg-none'>Amount</label>
            <input type='number' class='form-control' id='Amount' v-model='applicant.Amount' placeholder='$10'>
    
          </div>
          <div class='col-md-2 col-lg-1 d-flex align-items-center '>
            <span v-if='applicant.Edit === ""'><img src='../assets/edit.png' alt='edit' style='cursor: pointer '></span>
            <span v-if='applicant.Delete === ""'><img src='../assets/Delete.png' alt='delete' @click='deleteField(applicant.id)' style='cursor: pointer '></span>
            <span v-if='applicant.Add === ""'><img src='../assets/Dot-outline.png' class='img-fluid' alt='add' style='width: 40%;cursor: pointer '
                       @click='AddField'></span>
          </div>
        </div>
      </form>
    </div>
    <div class='row py-2'>
      <div class='col-lg-4 col-4'>
        <p class='fw-bold'>Total</p>
      </div>
      <div class='col-lg-5 col-4'>
        <span class='fw-bold d-block d-sm-block d-md-block d-lg-none'>Total Quelity</span>
        <p class='fw-bold '>{{ totalQuality }}</p>
      </div>
      <div class='col-lg col-4'>
        <span class='fw-bold d-block d-sm-block d-md-block d-lg-none'>Total Rate</span>
        <p class='fw-bold'>{{ totalRate }}</p>
      </div>
    </div>

    <div class='row '>
      <div class='col-lg-8 col-12 order-lg-0 order-md-1 order-1'>
        <p class='my-3 text-black fs-4'>Generate e-Way Bill</p>
        <div class='form-check form-check-inline'>
          <input class='form-check-input' type='checkbox' value='' id='flexCheckDefault'>
          <label class='form-check-label' for='flexCheckDefault'>
            No
          </label>
        </div>
        <div class='form-check form-check-inline'>
          <input class='form-check-input' type='checkbox' value='' id='GenarateEbook' checked>
          <label class='form-check-label' for='GenarateEbook'>
            Yes
          </label>
        </div>
        <div class='w-50 py-3'>
          <label class='form-check-label' for='Narrotion'>
            Narration
          </label>
          <textarea class='form-control' placeholder='001' id='Narrotion'></textarea>
        </div>
      </div>
      <div class='col-4 col-lg-4 col-12 order-md-0 order-0'>
        <div class=''>
          <div class='d-flex align-items-center gap-2'>
            <input class='form-check-input' type='checkbox' id='flexCheckChecked' v-model='IsRoundOff'>
            <span class='common-text'>Round Off</span>
            <div class='row'>
              <div class='col' >
                <input type='number' v-if='IsRoundOff' class='form-control' v-model='RoundOff'>
                <input type='number' v-else class='form-control' v-model='totalRate'>
              </div>
            </div>
          </div>
          <div class='row pt-3'>
            <div class='col-3'>
              <span class='common-text'>CGST</span>
            </div>
            <div class='col-9 p-0'>
              <span class='common-text'>{{ GstPlus }}</span>
            </div>
            <div class='col-3'>
              <span class='common-text'>SGST</span>
            </div>
            <div class='col-9 p-0'>
              <span class='common-text'>$1,23,567</span>
            </div>
            <div class='col-3'>
              <span class='common-text'>IGST</span>
            </div>
            <div class='col-9 p-0'>
              <span class='common-text'>$1,23,567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='d-none'>
      <Invoice :InvoiceDetails="InvoiceDetailsAdd"/>
    </div>
    <div class='w-100 py-2 d-flex justify-content-md-end justify-content-sm-center justify-content-center gap-4'>
      <button type='button' class='btn btn-outline-secondary px-5 rounded-pill'>Cancel</button>
      <button type='button' @click='printInvoice'  class='btn btn-primary px-5 rounded-pill'>
<!--        <RouterLink to='/invoice'>Save</RouterLink>-->
        Save
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
