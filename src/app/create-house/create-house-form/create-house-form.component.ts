import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegionSelectorComponent } from '../region-selector/region-selector.component';
import { County } from '../../shared/models/county.model';
import { House } from '../../shared/models/house.model';

@Component({
  selector: 'app-create-house-form',
  imports: [
    TextareaModule,
    InputTextModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    ButtonModule,
    RegionSelectorComponent,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './create-house-form.component.html',
  styleUrl: './create-house-form.component.scss',
})
export class CreateHouseFormComponent {
  @Input() isLoading: WritableSignal<boolean> = signal(true);
  @Input() showRegionSelector: WritableSignal<boolean> = signal(true);
  @Input() selectedCounty: WritableSignal<County | null> = signal(null);
  @Input() selectedCampaignId = signal<string | null>(null);
  @Input() onSubmit!: (house: House) => Promise<void>;
  createHouseForm!: FormGroup;

  private fb = inject(FormBuilder);

  constructor() {
    this.showRegionSelector = this.showRegionSelector;
  }

  ngOnInit() {
    this.createHouseForm = this.fb.group({
      houseName: ['', Validators.required],
      houseMotto: ['', Validators.required],
      headOfHouse: [''],
      houseBio: [''],
    });
  }

  onBackToRegion() {
    this.showRegionSelector.set(true);
  }

  async onFormSubmit() {
    if (this.createHouseForm.invalid) {
      this.createHouseForm.markAllAsTouched();
      return;
    }

    const house = {
      ...this.createHouseForm.value,
      countyId: this.selectedCounty()?.id,
      gold: 0,
    };

    await this.onSubmit(house);
  }
}
