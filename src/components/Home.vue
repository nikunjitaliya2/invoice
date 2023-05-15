<script setup>
import { reactive, ref } from 'vue'

// toggle button
const value = ref('')
const discount = ref(0)
const GstPlus = ref(0)
const TotalAmount = ref(0)

const InvoiceDetails = reactive({
  InvoiceNumber: 0,
  referenceNumber: 0,
  // Date: "dd-mm-yyyy",
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

const totalQuality = ref(0)
const totalRate = ref(0)


const SaveProductDetails = async (id) => {
  // await discountTotal(ItemList.Qlt, ItemList.Rate, ItemList.Discount, ItemList.Gst)
  await discountTotal(applicants[id].Qlt, applicants[id].Rate, applicants[id].Discount, applicants[id].Gst)

  applicants[id].Amount = TotalAmount.value

  console.log('check is working ----->>',applicants)

  // console.log('SaveProductDetails log ->',applicants[id].Qlt, applicants[id].Rate, applicants[id].Discount, applicants[id].Gst)
  // console.log('log ->',applicants[id])

  // Testing
  // applicants.filter((e) => {
  //   console.log('items details -----> ',e.Qlt)
  // })

  // total of quality
  totalQuality.value = applicants.reduce((acc, obj) => acc + obj.Qlt, 0)
  totalRate.value = applicants.reduce((acc, obj) => acc + obj.Amount, 0)
}

const count = ref(0)
const applicants = reactive([
  {
    id: 0,
    itemName: '',
    Qlt: '',
    Uom: '',
    Rate: '',
    Gst: '',
    Discount: '',
    Amount: ''
  },
  {
    id: ++count.value,
    itemName: '',
    Qlt: '',
    Uom: '',
    Rate: '',
    Gst: '',
    Discount: '',
    Amount: ''
  }
])

const AddField = async () => {
  applicants.push({
    id: ++count.value,
    itemName: '',
    Qlt: '',
    Uom: '',
    Rate: '',
    Gst: '',
    Discount: '',
    Amount: ''
  })

}

const deleteField = (item) => {
  applicants.splice(item, 1)
}

</script>

<template>
  <div class='container-fluid py-2 '>
    <div class='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
      <div class='col col-12'>
<!--        <label class='form-label'>Invoice No</label>-->
        <!--        <input type='number' v-model='InvoiceDetails.InvoiceNumber' class='form-control' id='InvoiceNo'-->
        <!--               placeholder='001'>-->
        <FormKit
          label='Invoice No'
          class='form-control'
          name='Invoice'
          placeholder='001'
          type='number'
          validation='required|character'
        />
      </div>
      <div class='col col-12'>
<!--        <label for='referenceNo' class='form-label'>Reference No.</label>-->
        <!--        <input type='number' v-model='InvoiceDetails.referenceNumber' class='form-control' id='referenceNo'-->
        <!--               placeholder='001'>-->

        <FormKit
          label='Reference No.'
          class='form-control'
          name='Reference No'
          type='number'
          validation='required|character'
        />
      </div>
      <div class='col col-12'>
<!--        <label class='form-label'>Date</label>-->
        <!--        <input type='date' class='form-control' id='Date' placeholder='Thursday, 21-02-2019'>-->
        <FormKit
          label='Date'
          type='date'
          name='date'
          value='2023-01-01'
          validation='required|after:2023/05/01'
          validation-visibility='live'
        />
      </div>
    </div>
    <div class='row row-cols-lg-2 row-cols-md-2 row-cols-sm-1'>
      <div class='col col-12'>
<!--        <label for='PartyName' class='form-label'>Party A/c Name</label>-->
        <!--        <input type='text' class='form-control' v-model='InvoiceDetails.AccountName' id='PartyName' placeholder='001'>-->
        <FormKit
          label='Party A/c Name'
          class='form-control'
          placeholder='John Doe'
          name='account Name'
          type='number'
          validation='required|character'
        />
      </div>
      <div class='col col-12'>
<!--        <label for='salesLadger' class='form-lab  el'>Sales Ledger</label>-->
<!--                <select class='form-select' id='salesLadger' aria-label='Default select example'-->
<!--                        v-model='InvoiceDetails.SalesLedger'>-->
<!--                  <option selected>Default</option>-->
<!--                  <option value='1'>Amazon Sale</option>-->
<!--                  <option value='2'>Flipcart</option>-->
<!--                  <option value='3'>Alibaba</option>-->
<!--                </select>-->
        <FormKit
          type='select'
          label='Sales Ledger'
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
        <p class='m-0'>Phone No. : 95687-69846 , Email id : abc@gmail.com</p>
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
        <div class='row row-cols-2 g-2 g-lg-3 py-2'>
          <div class='col-md-6 col-lg-4 col-12'>
<!--            <label for='NameItem' class='form-label d-block d-sm-block d-md-block d-lg-none'>Name of item</label>-->
<!--            <input type='text' class='form-control' id='NameItem' v-model='applicant.itemName'-->
<!--                   placeholder='lorem ipsums'>-->
            <FormKit
              class='form-control'
              placeholder="Ex. iphone"
              name='Item Name'
              type='text'
              v-model='applicant.itemName'
              validation='required|character'
            />
          </div>
          <div class='col-md-6 col-lg-1 col-12'>
<!--            <label for='NameItem' class='form-label d-block d-sm-block d-md-block d-lg-none'>Qlt</label>-->
<!--            <input type='number' class='form-control' id='quality' v-model='applicant.Qlt' placeholder='10'>-->
            <FormKit
              class='form-control'
              placeholder='10'
              v-model='applicant.Qlt'
              name='Qlt'
              type='number'
              validation='required|character'
            />
          </div>
          <div class='col-md-4 col-lg-1 col-12'>
<!--            <label for='NameItem' class='form-labd-sm-block d-md-block d-lg-none'>UOM</label>-->
<!--            <input type='number' class='form-control' id='uom' v-model='applicant.Uom' placeholder='MRTS'>-->
            <FormKit
              class='form-control'
              placeholder='10'
              v-model='applicant.Uom'
              name='uom'
              type='number'
            />
<!--              validation='required|character'-->
          </div>
          <div class='col-md-4 col-lg-1 col-12'>
<!--            <label for='NameItem' class='form-label d-block d-sm-block d-md-block d-lg-none'>Rate per</label>-->
<!--            <input type='number' class='form-control' id='ratePer' v-model='applicant.Rate' placeholder='$30'>-->
             <FormKit
             class='form-control'
              placeholder='$30'
              v-model='applicant.Rate'
              name='Rate'
              type='number'
             validation='required|character'
             />
          </div>
          <div class='col-md-4 col-lg-1 col-12'>
<!--            <label for='NameItem' class='form-label d-block d-sm-block d-md-block d-lg-none'>GST Rate</label>-->
<!--            <input type='number' class='form-control' v-model='applicant.Gst' id='gstRate' placeholder='10'>-->
            <FormKit
              class='form-control'
              placeholder='10'
              v-model='applicant.Gst'
              name='Gst'
              type='number'
              validation='required|character'
            />
          </div>
          <div class='col-md-4 col-lg-1 col-12'>
<!--            <label for='NameItem' class='form-label d-block d-sm-block d-md-block d-lg-none'>Discount</label>-->
<!--            <input type='number' class='form-control' id='discount' v-model='applicant.Discount' placeholder='10'>-->
            <FormKit
              class='form-control'
              placeholder='5'
              v-model='applicant.Discount'
              name='Gst'
              type='number'
              validation='required|character'
            />
          </div>
          <div class='col-md-4 col-lg-1 col-12'>
<!--            <label for='NameItem' class='form-label d-block d-sm-block d-md-block d-lg-none'>Amount</label>-->
<!--            <input type='number' class='form-control' id='Amount' v-model='applicant.Amount' placeholder='$10'>-->
            <FormKit
              class='form-control'
              v-model='applicant.Amount'
              name='Amount'
              type='number'
              placeholder='10'
              validation='required|character'
            />
          </div>
          <div class='col-md-4  col-lg-1 d-flex align-items-center  '>
            <i class='fa-solid fa-pen fs-5 px-1' style='cursor: pointer '></i>
            <i class='fa-solid fa-trash fs-5 px-1' @click='deleteField(applicant)' style='cursor: pointer '></i>
            <i class='fa-solid fa-plus fs-5' style='cursor: pointer ' @click='AddField'></i>
          </div>
        </div>
      </form>
    </div>
    <div class='row'>
      <div class='col-lg-4 col-auto'>
        <p class='fw-bold py-3 '>Total</p>
      </div>
      <div class='col-lg-5 col-auto py-3'>
        <span class='fw-bold d-block d-sm-block d-md-block d-lg-none'>Total Quelity</span>
        <p class='fw-bold '>{{ totalQuality === '' ? 0 : totalQuality }}</p>
      </div>
      <div class='col py-3'>
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
            <input class='form-check-input' type='checkbox' value='' id='flexCheckChecked' checked>
            <span class='common-text'>Round Off</span>
            <div class='row'>
              <div class='col'>
                <input type='number' class='form-control' id='roundOffId' v-model='totalRate'>
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
    <div class='w-100 py-2 d-flex justify-content-md-end justify-content-sm-center justify-content-center gap-4'>
      <button type='button' class='btn btn-outline-secondary px-5 rounded-pill'>Cancel</button>
      <button type='button' @click='SaveProductDetails' class='btn btn-primary px-5 rounded-pill'>Save</button>
    </div>
  </div>
</template>

<style scoped>

</style>
