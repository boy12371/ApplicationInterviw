<template>
  <div>
    <label>
      Enter l'identifiant du blog:
    </label>
    <input type="number" v-model="SiteID" />
    <ou-button @click="findSite">Valider</ou-button>
    <div v-if="Site.blogger!=''">
      <h1> {{ Site.title }} </h1>
      <label>
        <strong> blogger :</strong>
      </label> {{Site.blogger}}
      <div>
        <table class="ms-Table" style="margin-top:5vh">
          <thead>
            <tr>
              <td style="width:40vw">
                <strong> id </strong>
              </td>
              <td style="width:40vw">
                <strong> title </strong>
              </td>
              <td style="width:20vw"> </td>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(note,index) in Site.notes" :key='note'>
              <td style="width:40vw"> {{note.id }} </td>
              <td style="width:40vw"> {{note.title }} </td>
              <td style="width:20vw">
                <ou-button @click="Delete(note.id, index)">Supprimer</ou-button>

              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { AxiosRequestConfig, AxiosPromise, AxiosInstance } from "axios";
import { Blog } from "../models/Blog";

@Component
export default class blog extends Vue {
  public SiteID: number = 0;
  private axiosInstance: AxiosInstance;
  public Site: Blog = new Blog();

created()
{
  this.Site;
  this.axiosInstance = axios.create({
     baseURL: "https://clubfreetst.herokuapp.com/",
      headers: { "Content-Type": "application/json" }
    });
}

 findSite() {
    if (
      this.SiteID % 5 === 0 ||
      this.SiteID.toString().length < 5 ||
      this.SiteID.toString().length > 7
    ) {
      alert("id invalid");
      this.Site = new Blog();
      return;
    }
    this.axiosInstance
      .get<Blog>(`/blogs/${this.SiteID}`)
      .then(response => {
        this.Site = response.data;
      })
      .catch(error => {
        alert(error.response);
      });
  }

Delete(id : number , index : number)
{
this.axiosInstance
.delete(`/notes/${id}`)
 .then(response => {
        this.Site.notes.splice(index, 1);
      })
      .catch(error => {
        alert(error.response);
      });
}
}
 
</script>
<style>
td {
  text-align: left !important;
}
</style>


