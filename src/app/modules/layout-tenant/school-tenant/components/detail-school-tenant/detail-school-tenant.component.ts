import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from 'src/app/_models/layout-tenant/school/school.model';
import { ShareDataUsingService } from 'src/app/_services/share-data.service';
import { DATA_PERMISSION, INFO_ADVANCED_SCHOOL, TRAINING_LEVEL } from 'src/app/_shared/utils/constant';
@Component({
  selector: 'app-detail-school-tenant',
  templateUrl: './detail-school-tenant.component.html',
  styleUrls: ['./detail-school-tenant.component.scss', '../../helper.scss'],
})
export class DetailSchoolTenantComponent implements OnInit {
  arrInfoAdvanced = INFO_ADVANCED_SCHOOL;
  isLoading = false;
  permission = DATA_PERMISSION;
  infoBasicSchool: School;
  schoolId: string;
  dataSchoolToMap: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private shareDataUsingService: ShareDataUsingService
  ) {}

  ngOnInit(): void {
    this.schoolId = this.activatedRoute.snapshot.params.id;
    this.shareDataUsingService.currentApprovalStageMessage.subscribe((res: any) => {
      if(res.key == 'info-school') {
        this.infoBasicSchool = res.value;
        this.arrInfoAdvanced = this.mapDataAdvancedSchool(
          this.infoBasicSchool,
          this.arrInfoAdvanced
        );
      }
    })

  }

  mapDataAdvancedSchool(objMap: any, arrToMap = []) {
    let keys = Object.keys(objMap).filter(
      (item) => item.substring(0, 2) == 'Is'
    );
    arrToMap.forEach((item) => {
      if (keys.findIndex((i) => i == item.key) != -1) {
        item.value = objMap[item.key];
      }
    });
    return arrToMap;
  }

  update() {
    this.router.navigate([
      '/tenant/school/detail/' + this.schoolId + '/update',
    ]);
  }

  mapNameEducationStage(stage: number) {
    return TRAINING_LEVEL.find(item => item.code == stage)?.name || '--'
  }
}
