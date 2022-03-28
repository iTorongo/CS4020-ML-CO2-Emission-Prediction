from pydantic import BaseModel

class Features(BaseModel):
    country_id: float
    alt_nucl_en_perc: float
    air_trans_freight: float
    comb_ren_waste_perc: float
    elec_prod_coal_perc: float
    elec_prod_hydro_perc: float
    elec_prod_nat_gas_perc: float
    elec_prod_oil_perc: float
    en_use_pc: float
    fossil_fuel_en_cons_perc: float
    gdp_pc: float
    pop_growth_perc: float
    pop_urban_agg: float
    urban_pop_total: float
    urban_pop_growth: float
    methane_em: float
    no2_em: float