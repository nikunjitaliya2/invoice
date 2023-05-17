<script setup>
const InvoiceDetails = JSON.parse(localStorage.getItem('invoice'));

const printInvoiceAt = () => {
  window.print()
}

</script>

<template>
  <div id='invoice'>
    <div class='invoice-header w-25 border'>
      <h2>Invoice</h2>
      <div class='invoice-info' >
        <p><strong>Invoice Number:</strong> {{ InvoiceDetails[0]?.InvoiceNumber }}</p>
        <p><strong>Reference No :</strong> {{ InvoiceDetails[0]?.referenceNumber }}</p>
        <p><strong>Date:</strong> {{ InvoiceDetails[0]?.Date }}</p>
        <p><strong>Party A/c Name:</strong> {{ InvoiceDetails[0]?.AccountName}}</p>
        <p><strong>Sales Ledger:</strong> {{ InvoiceDetails[0]?.SalesLedger }}</p>
      </div>
    </div>
    <div class='invoice-body'>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Item Name</th>
          <th scope="col">UOM</th>
          <th scope="col">Rate</th>
          <th scope="col">Gst</th>
          <th scope="col">Discount</th>
          <th scope="col">Quality</th>
          <th scope="col">Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='item in InvoiceDetails[1]'>
          <th scope="row">{{ item.itemName }}</th>
          <td>{{ item.Uom }}</td>
          <td>{{ item.Rate }}</td>
          <td>{{ item.Gst }}</td>
          <td>{{ item.Discount }}</td>
          <td>{{ item.Qlt }}</td>
          <td>{{ item.Amount }}</td>
        </tr>
        <tr>

        <td colspan="5"><strong>TOTAL</strong></td>
        <td colspan="1">{{ InvoiceDetails[2]?.totalQuality  }}</td>
        <td colspan='1'>{{ InvoiceDetails[2]?.TotalAmount  }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <button @click='printInvoiceAt()'>print</button>
</template>
