import { Injectable } from "@angular/core"
import { collection, collectionData, Firestore, orderBy, query } from "@angular/fire/firestore"

@Injectable({
  providedIn: "root"
})
export class LeaderboardService {

  constructor(private firestore: Firestore) {
  }

  get() {
    return collectionData(query(
      collection(this.firestore, "public-results"),
      orderBy("accuracy", "desc"),
      orderBy("wpm", "desc")
    ))
  }
}
