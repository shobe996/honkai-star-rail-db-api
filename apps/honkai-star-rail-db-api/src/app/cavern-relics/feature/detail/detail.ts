import { Component, inject } from '@angular/core';
import { CavernRelicDetailFacadeService } from '../../data-access/cavern-relic-detail.facade.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-component',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class DetailComponent {
   private _cavernRelicDetailFacadeService = inject(CavernRelicDetailFacadeService);
 
  private _route = inject(ActivatedRoute);

  viewModel = toSignal(this._cavernRelicDetailFacadeService.viewModel$, {
    initialValue: { cavernRelic: null },
  });

  ngOnInit(): void {
    const idString = this._route.snapshot.paramMap.get('id');
    if (idString) {
      const id = Number.parseInt(idString);
      this._cavernRelicDetailFacadeService.getById(id);
    }
  }
}
