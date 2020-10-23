import Orphanage from "../models/Orphanage";
import ImageViews from "./Images_views"


export default {
    render(orphanage: Orphanage){
    return{
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.open_on_weekends,
      open_on_weekends: orphanage.open_on_weekends,
      images: ImageViews.renderMany(orphanage.images)
    }
  },

  renderMany(orphanages: Orphanage[]){
    return orphanages.map(orphanage => this.render(orphanage));
  }
}