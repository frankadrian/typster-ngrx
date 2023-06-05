import { Injectable } from "@angular/core"
import { collection, collectionData, Firestore, orderBy, query, where } from "@angular/fire/firestore"

@Injectable({
  providedIn: "root"
})
export class LeaderboardService {

  constructor(private firestore: Firestore) {
  }

  get() {

    //
    const q = query(
      collection(this.firestore, "results"),
      where("result.name", "!=", ""),
      orderBy("result.name", "asc"),
      orderBy("result.accuracy", "desc"),
      orderBy("result.wpm", "desc")
    )
    return collectionData(q)
  }
}
