import { Component, Input, signal, WritableSignal } from '@angular/core';
import { County } from '../../shared/models/county.model';
import { ImageModule } from 'primeng/image';
import { GlobalVarsService } from '../../core/services/global-vars.service';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-region-selector',
  imports: [ButtonModule, ImageModule, NgClass],
  templateUrl: './region-selector.component.html',
  styleUrl: './region-selector.component.scss',
})
export class RegionSelectorComponent {
  @Input() showRegionSelector: WritableSignal<boolean> = signal(true);
  @Input() selectedCounty: WritableSignal<County | null> = signal(null);
  counties = signal<County[]>([]);
  expandedCountyId = signal<string | null>(null);

  constructor(private globalVarsService: GlobalVarsService) {}

  ngOnInit() {
    this.counties = this.globalVarsService.allCounties;
  }

  toggleCounty(countyId: string) {
    this.expandedCountyId.set(
      this.expandedCountyId() === countyId ? null : countyId
    );
  }

  confirmCounty(countyId: string) {
    console.log('County selected:', countyId);
    const county = this.counties().find((c) => c.id == countyId);
    if (county) {
      this.selectedCounty.set(county);
      this.showRegionSelector.set(false);
    }
  }
}
