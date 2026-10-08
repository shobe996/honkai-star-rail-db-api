import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PlanarOrnamentDetailFacadeService } from '../../data-access/planar-ornament-detail.facade.service';

@Component({
  selector: 'app-detail-component',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class DetailComponent {
  private _planarOrnamentDetailFacadeService = inject(PlanarOrnamentDetailFacadeService);
 
  private _route = inject(ActivatedRoute);

  viewModel = toSignal(this._planarOrnamentDetailFacadeService.viewModel$, {
    initialValue: { planarOrnament: null },
  });

  ngOnInit(): void {
    const idString = this._route.snapshot.paramMap.get('id');
    if (idString) {
      const id = Number.parseInt(idString);
      this._planarOrnamentDetailFacadeService.getById(id);
    }
  }
}
